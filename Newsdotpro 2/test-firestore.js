import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

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
const db = getFirestore(app);

async function test() {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'), limit(5));
  const snap = await getDocs(q);
  snap.docs.forEach(d => {
    console.log(d.id, d.data().title, d.data().image);
  });
}
test().catch(console.error);
