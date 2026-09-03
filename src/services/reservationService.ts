import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseActive } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { cleanFirestoreData } from '../firebase/utils';
import type { Reservation, ReservationStatus } from '../types';

const LOCAL_KEY = 'greenshadow_reservations';

export const getLocalReservations = (): Reservation[] => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveLocalReservations = (list: Reservation[]): void => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save reservations locally', err);
  }
};

export async function createReservation(res: Reservation): Promise<Reservation> {
  const local = getLocalReservations();
  saveLocalReservations([res, ...local.filter((r) => r.id !== res.id)]);

  if (isFirebaseActive() && db) {
    const path = `reservations/${res.id}`;
    try {
      await setDoc(doc(db, 'reservations', res.id), cleanFirestoreData({
        ...res,
        serverCreatedAt: serverTimestamp()
      }));
      return res;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_reservations_changed'));
  return res;
}

export function subscribeToReservations(
  onUpdate: (list: Reservation[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    const path = 'reservations';
    return onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        const list: Reservation[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Reservation);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
        saveLocalReservations(list);
      },
      (err) => {
        console.warn('Firestore reservations subscription error:', err.message);
        if (onError) onError(err);
        onUpdate(getLocalReservations());
      }
    );
  }

  const emitLocal = () => onUpdate(getLocalReservations());
  emitLocal();

  const handleEvent = () => emitLocal();
  window.addEventListener('greenshadow_reservations_changed', handleEvent);
  window.addEventListener('storage', handleEvent);

  return () => {
    window.removeEventListener('greenshadow_reservations_changed', handleEvent);
    window.removeEventListener('storage', handleEvent);
  };
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  const local = getLocalReservations();
  const target = local.find((r) => r.id === id);
  if (target) {
    target.status = status;
    saveLocalReservations(local);
  }

  if (isFirebaseActive() && db) {
    const path = `reservations/${id}`;
    try {
      await updateDoc(doc(db, 'reservations', id), {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_reservations_changed'));
}
