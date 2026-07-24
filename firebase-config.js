// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAue-onhHbu1uK1MJn8l6inUmaoDf9Hu3c",
  authDomain: "lbrce-gate-portal.firebaseapp.com",
  projectId: "lbrce-gate-portal",
  storageBucket: "lbrce-gate-portal.firebasestorage.app",
  messagingSenderId: "727364019970",
  appId: "1:727364019970:web:8eb3aff466b8c23b33c41b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication and Database
export const auth = getAuth(app);
export const db = getFirestore(app);