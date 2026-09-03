import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseActive } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { cleanFirestoreData } from '../firebase/utils';
import type { Order, OrderStatus, DriverInfo } from '../types';

const LOCAL_ORDERS_KEY = 'greenshadow_orders_v2';

export const getLocalOrders = (): Order[] => {
  try {
    const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveLocalOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders locally', err);
  }
};

/**
 * Creates an order in Firestore with local fallback.
 */
export async function createOrder(order: Order): Promise<Order> {
  // Always update local cache first
  const currentLocal = getLocalOrders();
  const updatedLocal = [order, ...currentLocal.filter((o) => o.id !== order.id)];
  saveLocalOrders(updatedLocal);

  if (isFirebaseActive() && db) {
    const path = `orders/${order.id}`;
    try {
      // Clean undefined values for Firestore serialization
      const firestorePayload = cleanFirestoreData({
        ...order,
        serverCreatedAt: serverTimestamp(),
        updatedAt: new Date().toISOString()
      });
      await setDoc(doc(db, 'orders', order.id), firestorePayload);
      return order;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  // Local fallback trigger
  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed', { detail: order }));
  return order;
}

/**
 * Subscribes in real-time to a specific order by ID (Used by Customer Tracking Page).
 */
export function subscribeToOrder(
  orderId: string,
  onUpdate: (order: Order | null) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    return onSnapshot(
      doc(db, 'orders', orderId),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Order;
          onUpdate(data);
        } else {
          // Check local fallback
          const localOrder = getLocalOrders().find((o) => o.id === orderId) || null;
          onUpdate(localOrder);
        }
      },
      (error) => {
        console.warn(`Firestore order subscription error for ${orderId}:`, error.message);
        if (onError) onError(error);
        // Fallback to local
        const localOrder = getLocalOrders().find((o) => o.id === orderId) || null;
        onUpdate(localOrder);
      }
    );
  }

  // Local fallback listener
  const emitLocal = () => {
    const found = getLocalOrders().find((o) => o.id === orderId) || null;
    onUpdate(found);
  };
  emitLocal();

  const handleCustomEvent = () => emitLocal();
  window.addEventListener('greenshadow_orders_changed', handleCustomEvent);
  window.addEventListener('storage', handleCustomEvent);

  return () => {
    window.removeEventListener('greenshadow_orders_changed', handleCustomEvent);
    window.removeEventListener('storage', handleCustomEvent);
  };
}

/**
 * Subscribes in real-time to all orders (Used by Admin Dashboard).
 */
export function subscribeToAllOrders(
  onUpdate: (orders: Order[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    const path = 'orders';
    return onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const list: Order[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Order);
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
        saveLocalOrders(list);
      },
      (error) => {
        console.warn('Firestore orders collection listener error:', error.message);
        if (onError) onError(error);
        onUpdate(getLocalOrders());
      }
    );
  }

  // Local fallback
  const emitLocal = () => onUpdate(getLocalOrders());
  emitLocal();

  const handleEvent = () => emitLocal();
  window.addEventListener('greenshadow_orders_changed', handleEvent);
  window.addEventListener('storage', handleEvent);

  return () => {
    window.removeEventListener('greenshadow_orders_changed', handleEvent);
    window.removeEventListener('storage', handleEvent);
  };
}

/**
 * Updates order status and timeline in Firestore (Used by Admin Dashboard).
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  note?: string,
  driver?: DriverInfo
): Promise<void> {
  const localList = getLocalOrders();
  const target = localList.find((o) => o.id === orderId);

  const newTimelineEvent = {
    status: newStatus,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    titleEn: `Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`,
    titleBn: `অর্ডারের স্থিতি পরিবর্তিত: ${newStatus}`,
    note: note || undefined
  };

  const updatedTimeline = target ? [...target.timeline, newTimelineEvent] : [newTimelineEvent];

  if (target) {
    target.status = newStatus;
    target.timeline = updatedTimeline;
    if (driver) target.driver = driver;
    saveLocalOrders(localList);
  }

  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      const payload: Record<string, any> = cleanFirestoreData({
        status: newStatus,
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString(),
        ...(driver ? { driver } : {})
      });
      await updateDoc(doc(db, 'orders', orderId), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed'));
}

/**
 * Submits customer review & rating for an order.
 */
export async function submitOrderRating(
  orderId: string,
  rating: number,
  reviewText?: string
): Promise<void> {
  const localList = getLocalOrders();
  const target = localList.find((o) => o.id === orderId);
  if (target) {
    target.rating = rating;
    if (reviewText) target.reviewText = reviewText;
    saveLocalOrders(localList);
  }

  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        rating,
        reviewText: reviewText || '',
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed'));
}
