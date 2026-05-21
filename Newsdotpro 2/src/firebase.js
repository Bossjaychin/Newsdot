import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxj1Pctkepq0CRj71bnNiroHgtx86iyxs",
  authDomain: "newsdot.firebaseapp.com",
  projectId: "newsdot",
  storageBucket: "newsdot.firebasestorage.app",
  messagingSenderId: "719261702956",
  appId: "1:719261702956:web:9b58eab01f57de49cf6a89",
  measurementId: "G-RVN4DPLW3X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
