import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace with your own Firebase project configuration.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyBK0XzEH7ZmcnpLIDg-pBrNzxowYwW0sjQ",
  authDomain: "kr-image-generator-backend.firebaseapp.com",
  projectId: "kr-image-generator-backend",
  storageBucket: "kr-image-generator-backend.firebasestorage.app",
  messagingSenderId: "1086560410470",
  appId: "1:1086560410470:web:13a9dd2f0db40fa371c6a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
