import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseActive } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import type {
  Order,
  OrderStatus,
  DriverInfo,
  Reservation,
  ReservationStatus,
  MenuItem
} from '../types';

// ============================================================================
// LOCAL STORAGE KEYS & FALLBACK HELPERS (Graceful Offline & Preview Support)
// ============================================================================
const LOCAL_STORAGE_KEYS = {
  ORDERS: 'greenshadow_orders_v2',
  RESERVATIONS: 'greenshadow_reservations_v2',
  MENU_ITEMS: 'greenshadow_menu_items_v2'
};

function getLocalData<T>(key: string, fallback: T[] = []): T[] {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocalData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to persist local cache for key ${key}:`, err);
  }
}

export const getLocalOrders = (): Order[] => getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
export const saveLocalOrders = (orders: Order[]): void => saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, orders);

export const getLocalReservations = (): Reservation[] => getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
export const saveLocalReservations = (res: Reservation[]): void => saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, res);

export const getLocalMenuItems = (fallback: MenuItem[] = []): MenuItem[] => getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS, fallback);
export const saveLocalMenuItems = (items: MenuItem[]): void => saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, items);

// ============================================================================
// 1. ORDERS CRUD OPERATIONS
// ============================================================================

/**
 * CREATE: Place a new customer order into Firestore (with local cache fallback).
 */
export async function createOrder(order: Order): Promise<Order> {
  // Sync to local cache immediately
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  const updatedLocal = [order, ...localOrders.filter((o) => o.id !== order.id)];
  saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, updatedLocal);

  if (isFirebaseActive() && db) {
    const path = `orders/${order.id}`;
    try {
      const firestorePayload = {
        ...order,
        serverCreatedAt: serverTimestamp(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'orders', order.id), firestorePayload);
      return order;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  // Notify local listeners
  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed', { detail: order }));
  return order;
}

/**
 * READ: Fetch a single order by ID.
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      const snap = await getDoc(doc(db, 'orders', orderId));
      if (snap.exists()) {
        return snap.data() as Order;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  }

  // Local fallback
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  return localOrders.find((o) => o.id === orderId) || null;
}

export const getOrder = getOrderById;

/**
 * READ: Fetch all orders.
 */
export async function getAllOrders(): Promise<Order[]> {
  if (isFirebaseActive() && db) {
    const path = 'orders';
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const orders: Order[] = [];
      snapshot.forEach((docSnap) => {
        orders.push(docSnap.data() as Order);
      });
      saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, orders);
      return orders;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  }

  return getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
}

/**
 * UPDATE: Update order document fields.
 */
export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  const updated = localOrders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
  saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, updated);

  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed'));
}

/**
 * UPDATE: Update order fulfillment status and timeline.
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  note?: string,
  driver?: DriverInfo
): Promise<void> {
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  const target = localOrders.find((o) => o.id === orderId);

  const statusTitlesEn: Record<OrderStatus, string> = {
    placed: 'Order Placed',
    confirmed: 'Order Confirmed by Restaurant',
    preparing: 'Kitchen Cooking & Preparing',
    out_for_delivery: 'Rider Dispatched for Delivery',
    ready_for_pickup: 'Order Ready at Rooftop Counter',
    delivered: 'Order Delivered Successfully',
    completed: 'Order Completed',
    cancelled: 'Order Cancelled'
  };

  const statusTitlesBn: Record<OrderStatus, string> = {
    placed: 'অর্ডার গ্রহণ করা হয়েছে',
    confirmed: 'রেস্টুরেন্ট থেকে কনফার্ম করা হয়েছে',
    preparing: 'রান্নাঘরে প্রস্তুত হচ্ছে',
    out_for_delivery: 'রাইডার ডেলিভারির জন্য রওনা হয়েছেন',
    ready_for_pickup: 'পিকআপের জন্য প্রস্তুত',
    delivered: 'ডেলিভারি সম্পন্ন হয়েছে',
    completed: 'অর্ডার সম্পন্ন',
    cancelled: 'অর্ডার বাতিল করা হয়েছে'
  };

  const newTimelineEvent = {
    status: newStatus,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    titleEn: statusTitlesEn[newStatus] || `Status updated to ${newStatus}`,
    titleBn: statusTitlesBn[newStatus] || `অর্ডারের স্থিতি পরিবর্তিত: ${newStatus}`,
    note: note || undefined
  };

  const updatedTimeline = target ? [...target.timeline, newTimelineEvent] : [newTimelineEvent];

  if (target) {
    target.status = newStatus;
    target.timeline = updatedTimeline;
    if (driver) target.driver = driver;
    saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, localOrders);
  }

  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      const payload: Record<string, any> = {
        status: newStatus,
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString()
      };
      if (driver) payload.driver = driver;
      await updateDoc(doc(db, 'orders', orderId), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed'));
}

/**
 * UPDATE: Customer rating and review for order.
 */
export async function submitOrderRating(
  orderId: string,
  rating: number,
  reviewText?: string
): Promise<void> {
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  const target = localOrders.find((o) => o.id === orderId);
  if (target) {
    target.rating = rating;
    if (reviewText) target.reviewText = reviewText;
    saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, localOrders);
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

/**
 * DELETE: Delete an order by ID.
 */
export async function deleteOrder(orderId: string): Promise<void> {
  const localOrders = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS);
  const filtered = localOrders.filter((o) => o.id !== orderId);
  saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, filtered);

  if (isFirebaseActive() && db) {
    const path = `orders/${orderId}`;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_orders_changed'));
}

/**
 * REALTIME: Subscribe to a single order for live tracking.
 */
export function subscribeToOrder(
  orderId: string,
  onUpdate: (order: Order | null) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    return onSnapshot(
      doc(db, 'orders', orderId),
      (snap) => {
        if (snap.exists()) {
          onUpdate(snap.data() as Order);
        } else {
          const localOrder = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS).find((o) => o.id === orderId) || null;
          onUpdate(localOrder);
        }
      },
      (error) => {
        console.warn(`Firestore order subscription error for ${orderId}:`, error.message);
        if (onError) onError(error);
        const localOrder = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS).find((o) => o.id === orderId) || null;
        onUpdate(localOrder);
      }
    );
  }

  const emit = () => {
    const local = getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS).find((o) => o.id === orderId) || null;
    onUpdate(local);
  };
  emit();

  window.addEventListener('greenshadow_orders_changed', emit);
  window.addEventListener('storage', emit);
  return () => {
    window.removeEventListener('greenshadow_orders_changed', emit);
    window.removeEventListener('storage', emit);
  };
}

/**
 * REALTIME: Subscribe to all orders for kitchen/admin dashboard.
 */
export function subscribeToAllOrders(
  onUpdate: (orders: Order[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    return onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const list: Order[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Order);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
        saveLocalData(LOCAL_STORAGE_KEYS.ORDERS, list);
      },
      (error) => {
        console.warn('Firestore orders collection listener error:', error.message);
        if (onError) onError(error);
        onUpdate(getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS));
      }
    );
  }

  const emit = () => onUpdate(getLocalData<Order>(LOCAL_STORAGE_KEYS.ORDERS));
  emit();

  window.addEventListener('greenshadow_orders_changed', emit);
  window.addEventListener('storage', emit);
  return () => {
    window.removeEventListener('greenshadow_orders_changed', emit);
    window.removeEventListener('storage', emit);
  };
}

export const subscribeToOrders = subscribeToAllOrders;

// ============================================================================
// 2. RESERVATIONS CRUD OPERATIONS
// ============================================================================

/**
 * CREATE: Book a table reservation in Firestore.
 */
export async function createReservation(res: Reservation): Promise<Reservation> {
  const local = getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
  saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, [res, ...local.filter((r) => r.id !== res.id)]);

  if (isFirebaseActive() && db) {
    const path = `reservations/${res.id}`;
    try {
      await setDoc(doc(db, 'reservations', res.id), {
        ...res,
        serverCreatedAt: serverTimestamp(),
        updatedAt: new Date().toISOString()
      });
      return res;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_reservations_changed'));
  return res;
}

/**
 * READ: Fetch a single reservation by ID.
 */
export async function getReservationById(resId: string): Promise<Reservation | null> {
  if (isFirebaseActive() && db) {
    const path = `reservations/${resId}`;
    try {
      const snap = await getDoc(doc(db, 'reservations', resId));
      if (snap.exists()) {
        return snap.data() as Reservation;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  }

  const local = getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
  return local.find((r) => r.id === resId) || null;
}

export const getReservation = getReservationById;

/**
 * READ: Fetch all table reservations.
 */
export async function getAllReservations(): Promise<Reservation[]> {
  if (isFirebaseActive() && db) {
    const path = 'reservations';
    try {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const list: Reservation[] = [];
      snapshot.forEach((d) => list.push(d.data() as Reservation));
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, list);
      return list;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  }

  return getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
}

/**
 * UPDATE: Update reservation document fields.
 */
export async function updateReservation(
  resId: string,
  updates: Partial<Reservation>
): Promise<void> {
  const local = getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
  const updated = local.map((r) => (r.id === resId ? { ...r, ...updates } : r));
  saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, updated);

  if (isFirebaseActive() && db) {
    const path = `reservations/${resId}`;
    try {
      await updateDoc(doc(db, 'reservations', resId), {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_reservations_changed'));
}

/**
 * UPDATE: Update reservation status (Pending, Confirmed, Cancelled, etc.).
 */
export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  await updateReservation(id, { status });
}

/**
 * DELETE: Remove a reservation.
 */
export async function deleteReservation(resId: string): Promise<void> {
  const local = getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS);
  const filtered = local.filter((r) => r.id !== resId);
  saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, filtered);

  if (isFirebaseActive() && db) {
    const path = `reservations/${resId}`;
    try {
      await deleteDoc(doc(db, 'reservations', resId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_reservations_changed'));
}

/**
 * REALTIME: Subscribe to reservations list.
 */
export function subscribeToReservations(
  onUpdate: (list: Reservation[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    return onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        const list: Reservation[] = [];
        snapshot.forEach((d) => list.push(d.data() as Reservation));
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
        saveLocalData(LOCAL_STORAGE_KEYS.RESERVATIONS, list);
      },
      (err) => {
        console.warn('Firestore reservations subscription error:', err.message);
        if (onError) onError(err);
        onUpdate(getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS));
      }
    );
  }

  const emit = () => onUpdate(getLocalData<Reservation>(LOCAL_STORAGE_KEYS.RESERVATIONS));
  emit();

  window.addEventListener('greenshadow_reservations_changed', emit);
  window.addEventListener('storage', emit);
  return () => {
    window.removeEventListener('greenshadow_reservations_changed', emit);
    window.removeEventListener('storage', emit);
  };
}

// ============================================================================
// 3. MENU INVENTORY CRUD OPERATIONS
// ============================================================================

/**
 * CREATE: Add a new dish to the menu catalog.
 */
export async function createMenuItem(item: MenuItem): Promise<MenuItem> {
  const local = getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS);
  saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, [item, ...local.filter((i) => i.id !== item.id)]);

  if (isFirebaseActive() && db) {
    const path = `menuItems/${item.id}`;
    try {
      await setDoc(doc(db, 'menuItems', item.id), item);
      return item;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_menu_changed'));
  return item;
}

/**
 * READ: Fetch a single menu item by ID.
 */
export async function getMenuItemById(itemId: string): Promise<MenuItem | null> {
  if (isFirebaseActive() && db) {
    const path = `menuItems/${itemId}`;
    try {
      const snap = await getDoc(doc(db, 'menuItems', itemId));
      if (snap.exists()) {
        return snap.data() as MenuItem;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  }

  const local = getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS);
  return local.find((i) => i.id === itemId) || null;
}

export const getMenuItem = getMenuItemById;

/**
 * READ: Fetch all menu items.
 */
export async function getAllMenuItems(fallback: MenuItem[] = []): Promise<MenuItem[]> {
  if (isFirebaseActive() && db) {
    const path = 'menuItems';
    try {
      const snapshot = await getDocs(collection(db, 'menuItems'));
      if (!snapshot.empty) {
        const items: MenuItem[] = [];
        snapshot.forEach((d) => items.push(d.data() as MenuItem));
        saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, items);
        return items;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  }

  return getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS, fallback);
}

/**
 * UPDATE: Update menu item fields.
 */
export async function updateMenuItem(
  itemId: string,
  updates: Partial<MenuItem>
): Promise<void> {
  const local = getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS);
  const updated = local.map((i) => (i.id === itemId ? { ...i, ...updates } : i));
  saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, updated);

  if (isFirebaseActive() && db) {
    const path = `menuItems/${itemId}`;
    try {
      await updateDoc(doc(db, 'menuItems', itemId), {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_menu_changed'));
}

/**
 * UPDATE: Toggle live availability/in-stock status of a dish.
 */
export async function updateMenuItemAvailability(
  itemId: string,
  isAvailable: boolean,
  currentItems: MenuItem[] = []
): Promise<void> {
  const source = currentItems.length > 0 ? currentItems : getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS);
  const updated = source.map((item) =>
    item.id === itemId ? { ...item, isAvailable } : item
  );
  saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, updated);

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

/**
 * DELETE: Remove a dish from the menu catalog.
 */
export async function deleteMenuItem(itemId: string): Promise<void> {
  const local = getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS);
  const filtered = local.filter((i) => i.id !== itemId);
  saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, filtered);

  if (isFirebaseActive() && db) {
    const path = `menuItems/${itemId}`;
    try {
      await deleteDoc(doc(db, 'menuItems', itemId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }

  window.dispatchEvent(new CustomEvent('greenshadow_menu_changed'));
}

/**
 * REALTIME: Subscribe to menu inventory with initial seeding if collection is fresh.
 */
export function subscribeToMenuItems(
  initialFallback: MenuItem[],
  onUpdate: (items: MenuItem[]) => void,
  onError?: (err: any) => void
): () => void {
  if (isFirebaseActive() && db) {
    return onSnapshot(
      collection(db, 'menuItems'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: MenuItem[] = [];
          snapshot.forEach((d) => list.push(d.data() as MenuItem));
          onUpdate(list);
          saveLocalData(LOCAL_STORAGE_KEYS.MENU_ITEMS, list);
        } else {
          // Seed menu items once if empty
          seedMenuItemsIfEmpty(initialFallback);
          onUpdate(initialFallback);
        }
      },
      (err) => {
        console.warn('Firestore menu items subscription error:', err.message);
        if (onError) onError(err);
        onUpdate(getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS, initialFallback));
      }
    );
  }

  const emit = () => onUpdate(getLocalData<MenuItem>(LOCAL_STORAGE_KEYS.MENU_ITEMS, initialFallback));
  emit();

  window.addEventListener('greenshadow_menu_changed', emit);
  window.addEventListener('storage', emit);
  return () => {
    window.removeEventListener('greenshadow_menu_changed', emit);
    window.removeEventListener('storage', emit);
  };
}

/**
 * UTILITY: Seed initial menu items if Firestore collection is brand new.
 */
export async function seedMenuItemsIfEmpty(initialItems: MenuItem[]): Promise<void> {
  if (!isFirebaseActive() || !db) return;
  try {
    const snap = await getDocs(collection(db, 'menuItems'));
    if (snap.empty) {
      for (const item of initialItems) {
        await setDoc(doc(db, 'menuItems', item.id), item);
      }
      console.log('Seeded menu items to Firestore');
    }
  } catch (err) {
    console.warn('Menu seeding notice:', err);
  }
}
