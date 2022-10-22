
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your authdomain",
  projectId: "project id",
  storageBucket: "your storage bucket ",
  messagingSenderId: "your message id",
  appId: "app id"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore()
export const storage=getStorage()