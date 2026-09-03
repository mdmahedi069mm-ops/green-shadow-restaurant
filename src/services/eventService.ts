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
import type { EventInquiry, ReservationStatus } from '../types';

const LOCAL_KEY = 'greenshadow_events';

export const getLocalEvents = (): EventInquiry[] => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveLocalEvents = (list: EventInquiry[]): void => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save events locally', err);
  }
};

export async function createEventInquiry(inquiry: EventInquiry): Promise<EventInquiry> {
  const local = getLocalEvents();
  saveLocalEvents([inquiry, ...local.filter((i) => i.id !== inquiry.id)]);

  if (isFirebaseActive() && db) {
    const path = `eventInquiries/${inquiry.id}`;
    try {
      await setDoc(doc(db, 'eventInquiries', inquiry.id), cleanFirestoreData({
        ...inquiry,
        serverCreatedAt: serverTimestamp()
      }));
      return inquiry;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_events_changed'));
  return inquiry;
}

export function subscribeToEventInquiries(
  onUpdate: (list: EventInquiry[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    const path = 'eventInquiries';
    return onSnapshot(
      collection(db, 'eventInquiries'),
      (snapshot) => {
        const list: EventInquiry[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as EventInquiry);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
        saveLocalEvents(list);
      },
      (err) => {
        console.warn('Firestore event inquiries subscription error:', err.message);
        if (onError) onError(err);
        onUpdate(getLocalEvents());
      }
    );
  }

  const emitLocal = () => onUpdate(getLocalEvents());
  emitLocal();

  const handleEvent = () => emitLocal();
  window.addEventListener('greenshadow_events_changed', handleEvent);
  window.addEventListener('storage', handleEvent);

  return () => {
    window.removeEventListener('greenshadow_events_changed', handleEvent);
    window.removeEventListener('storage', handleEvent);
  };
}

export async function updateEventInquiryStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  const local = getLocalEvents();
  const target = local.find((e) => e.id === id);
  if (target) {
    target.status = status;
    saveLocalEvents(local);
  }

  if (isFirebaseActive() && db) {
    const path = `eventInquiries/${id}`;
    try {
      await updateDoc(doc(db, 'eventInquiries', id), {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_events_changed'));
}
