import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQxrZq7z4M8k8wDiZb7BG_JaShdemlz-c",
  authDomain: "afuego-burgers.firebaseapp.com",
  projectId: "afuego-burgers",
  storageBucket: "afuego-burgers.firebasestorage.app",
  messagingSenderId: "200906227197",
  appId: "1:200906227197:web:85642c1e092841267e6d94",
  measurementId: "G-CTWMP8L2K1"
};

export const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);

export const auth =
  getAuth(app);