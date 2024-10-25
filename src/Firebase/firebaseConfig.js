import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};*/
const firebaseConfig = {
  apiKey: "AIzaSyCpoD20CDvD9li8Ky_ULRRfXbotqg33CQo",
  authDomain: "simposio-df298.firebaseapp.com",
  projectId: "simposio-df298",
  storageBucket: "simposio-df298.appspot.com",
  messagingSenderId: "518927230386",
  appId: "1:518927230386:web:6febb33ebb93c277f970ab",
  measurementId: "G-2Q56BNF3NF"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);

export { auth, db };
