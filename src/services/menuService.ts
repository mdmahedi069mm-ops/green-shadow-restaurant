import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { db, isFirebaseActive } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { cleanFirestoreData } from '../firebase/utils';
import type { MenuItem } from '../types';

const LOCAL_KEY = 'greenshadow_items';

export const getLocalMenuItems = (fallback: MenuItem[] = []): MenuItem[] => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const saveLocalMenuItems = (items: MenuItem[]): void => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save menu items locally', err);
  }
};

export function subscribeToMenuItems(
  initialFallback: MenuItem[],
  onUpdate: (items: MenuItem[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    const path = 'menuItems';
    return onSnapshot(
      collection(db, 'menuItems'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: MenuItem[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as MenuItem);
          });
          onUpdate(list);
          saveLocalMenuItems(list);
        } else {
          // If Firestore collection is empty, seed it with verified menu items
          seedMenuItemsIfEmpty(initialFallback);
          onUpdate(initialFallback);
        }
      },
      (err) => {
        console.warn('Firestore menu items subscription error:', err.message);
        if (onError) onError(err);
        onUpdate(getLocalMenuItems(initialFallback));
      }
    );
  }

  const emitLocal = () => onUpdate(getLocalMenuItems(initialFallback));
  emitLocal();

  const handleEvent = () => emitLocal();
  window.addEventListener('greenshadow_menu_changed', handleEvent);
  window.addEventListener('storage', handleEvent);

  return () => {
    window.removeEventListener('greenshadow_menu_changed', handleEvent);
    window.removeEventListener('storage', handleEvent);
  };
}

export async function updateMenuItemAvailability(
  itemId: string,
  isAvailable: boolean,
  currentItems: MenuItem[]
): Promise<void> {
  const updated = currentItems.map((item) =>
    item.id === itemId ? { ...item, isAvailable } : item
  );
  saveLocalMenuItems(updated);

  if (isFirebaseActive() && db) {
    const path = `menuItems/${itemId}`;
    try {
      await updateDoc(doc(db, 'menuItems', itemId), {
        isAvailable,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_menu_changed'));
}

export async function seedMenuItemsIfEmpty(initialItems: MenuItem[]): Promise<void> {
  if (!isFirebaseActive() || !db) return;
  try {
    const snap = await getDocs(collection(db, 'menuItems'));
    if (snap.empty) {
      for (const item of initialItems) {
        await setDoc(doc(db, 'menuItems', item.id), cleanFirestoreData(item));
      }
      console.log('Seeded menu items to Firestore');
    }
  } catch (err) {
    console.warn('Menu seeding notice:', err);
  }
}
