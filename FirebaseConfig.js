// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Y0hs_qQDudlTRKpTMI8MuzxkgFIJ4u4",
  authDomain: "uas-mobile-7f44e.firebaseapp.com",
  projectId: "uas-mobile-7f44e",
  storageBucket: "uas-mobile-7f44e.appspot.com",
  messagingSenderId: "769038169832",
  appId: "1:769038169832:web:70b75d47029e72ee7f7b5d",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
