import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore
import { Auth, browserLocalPersistence, getAuth, getReactNativePersistence, initializeAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAwYgX9dKcWSWcOlinmlei7uMh_ZaHbdDs",
  authDomain: "monitorhub-74818.firebaseapp.com",
  projectId: "monitorhub-74818",
  storageBucket: "monitorhub-74818.firebasestorage.app",
  messagingSenderId: "1060426736534",
  appId: "1:1060426736534:web:9eb7f5d5e300a489b333b7",
};

export const app = initializeApp(firebaseConfig);
let auth: Auth;

try {
  if (Platform.OS === "web") {
    auth = getAuth(app);

    setPersistence(auth, browserLocalPersistence);
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch {
  auth = getAuth(app);
}
export const db = getFirestore(app);
export { auth };
