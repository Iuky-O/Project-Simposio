import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: meta.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);

export { auth, db };
