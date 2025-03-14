import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cdsmartfarm.firebaseapp.com",
  databaseURL: "https://cdsmartfarm-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "cdsmartfarm",
  storageBucket: "cdsmartfarm.firebasestorage.app",
  messagingSenderId: "408093826153",
  appId: "1:408093826153:web:97c4d6238f776a282b56f8",
  measurementId: "G-TLCWMN8BYV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
