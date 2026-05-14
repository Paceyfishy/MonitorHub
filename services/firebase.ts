import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwYgX9dKcWSWcOlinmlei7uMh_ZaHbdDs",
  authDomain: "monitorhub-74818.firebaseapp.com",
  projectId: "monitorhub-74818",
  storageBucket: "monitorhub-74818.firebasestorage.app",
  messagingSenderId: "1060426736534",
  appId: "1:1060426736534:web:9eb7f5d5e300a489b333b7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
