import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCGdDmRGiP7r-F8SNoMYGq1m39lOVaEtI",
  authDomain: "portfolio-43cb3.firebaseapp.com",
  projectId: "portfolio-43cb3",
  storageBucket: "portfolio-43cb3.firebasestorage.app",
  messagingSenderId: "178444093214",
  appId: "1:178444093214:web:a4fb76e3c3f0fca9eceb0f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
