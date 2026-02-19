import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmMbWtzhJ0AeJge3m7DIw5R30gc_F15tg",
  authDomain: "profolio-97d5a.firebaseapp.com",
  projectId: "profolio-97d5a",
  storageBucket: "profolio-97d5a.firebasestorage.app",
  messagingSenderId: "279345539799",
  appId: "1:279345539799:web:ab5fbacf4f7d80cf399e92",
  measurementId: "G-P78C11T7HK"
};

// ✅ Step 1 — Initialize app FIRST
const app = initializeApp(firebaseConfig);

// ✅ Step 2 — Initialize services AFTER app
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Step 3 — Export at bottom
export { auth, db, storage };
