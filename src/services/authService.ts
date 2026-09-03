import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth, isFirebaseActive } from '../firebase/config';
import type { AdminUser } from '../types';

const ADMIN_STORAGE_KEY = 'greenshadow_admin_auth_v2';

export const getLocalAdminUser = (): AdminUser | null => {
  try {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export async function createAdminAccount(email: string, password: string, name?: string): Promise<AdminUser> {
  if (isFirebaseActive() && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user: User = userCredential.user;
      const adminData: AdminUser = {
        id: user.uid,
        email: user.email || email,
        name: name || user.displayName || email.split('@')[0] || 'Staff Operator',
        role: 'admin'
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      return adminData;
    } catch (err: any) {
      console.error('Firebase Auth signup error:', err);
      let userFriendlyMsg = 'Staff registration failed.';
      if (err.code === 'auth/email-already-in-use') {
        userFriendlyMsg = 'This staff email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        userFriendlyMsg = 'Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        userFriendlyMsg = 'Please enter a valid staff email address.';
      }
      throw new Error(userFriendlyMsg);
    }
  }

  const fallbackAdmin: AdminUser = {
    id: `staff-local-${Date.now()}`,
    email: email,
    name: name || email.split('@')[0] || 'Staff Operator',
    role: 'admin'
  };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(fallbackAdmin));
  return fallbackAdmin;
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  if (isFirebaseActive() && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user: User = userCredential.user;
      const adminData: AdminUser = {
        id: user.uid,
        email: user.email || email,
        name: user.displayName || email.split('@')[0] || 'Staff Member',
        role: 'admin'
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      return adminData;
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      let userFriendlyMsg = 'Authentication failed. Please verify credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        userFriendlyMsg = 'Invalid email or password. Please check your staff credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        userFriendlyMsg = 'Too many failed login attempts. Access temporarily restricted.';
      }
      throw new Error(userFriendlyMsg);
    }
  }

  // Fallback demo mode when Firebase Auth env variables are pending
  // We strictly require non-empty credentials
  if (!email || !password) {
    throw new Error('Please provide both staff email and password.');
  }

  if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('greenshadow')) {
    const fallbackAdmin: AdminUser = {
      id: 'staff-local-1',
      email: email,
      name: email.split('@')[0] || 'Staff Manager',
      role: 'admin'
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(fallbackAdmin));
    return fallbackAdmin;
  }

  throw new Error('Invalid credentials. For local preview, use staff/admin email format.');
}

export async function logoutAdmin(): Promise<void> {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  if (isFirebaseActive() && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase logout warning:', err);
    }
  }
}

export function subscribeToAdminAuth(callback: (user: AdminUser | null) => void): () => void {
  if (isFirebaseActive() && auth) {
    return firebaseOnAuthStateChanged(auth, (user) => {
      if (user) {
        const admin: AdminUser = {
          id: user.uid,
          email: user.email || 'staff@thegreenshadow.com',
          name: user.displayName || 'Restaurant Staff',
          role: 'admin'
        };
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
        callback(admin);
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        callback(null);
      }
    });
  }

  // Local fallback
  callback(getLocalAdminUser());
  return () => {};
}
