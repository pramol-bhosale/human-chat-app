
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7_nibqshi5GiyASjYR2nb0dMirHlrXfI",
  authDomain: "human-chat-p.firebaseapp.com",
  projectId: "human-chat-p",
  storageBucket: "human-chat-p.appspot.com",
  messagingSenderId: "1035107817571",
  appId: "1:1035107817571:web:bbcb1784afbfd6ebafc056"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore()
export const storage=getStorage()