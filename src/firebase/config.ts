import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingKeys: string[];
  projectId?: string;
}

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const checkFirebaseConfig = (): FirebaseConfigStatus => {
  const missing: string[] = [];
  if (!firebaseConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY');
  if (!firebaseConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
  if (!firebaseConfig.appId) missing.push('VITE_FIREBASE_APP_ID');

  return {
    isConfigured: missing.length === 0,
    missingKeys: missing,
    projectId: firebaseConfig.projectId
  };
};

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

const configStatus = checkFirebaseConfig();

if (configStatus.isConfigured) {
  try {
    appInstance = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
  } catch (err) {
    console.error('Firebase initialization error:', err);
  }
} else {
  // Graceful log for developers/owners
  console.info(
    'Firebase environment credentials not detected. The Green Shadow is operating in Local Fallback mode until VITE_FIREBASE_* keys are configured in Vercel or .env.'
  );
}

export const app = appInstance;
export const db = dbInstance;
export const auth = authInstance;
export const isFirebaseActive = (): boolean => dbInstance !== null;
