// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLwxCMD5WcLUA2EWNZWBI-jSdHBil76z8",
  authDomain: "vite-contact-49654.firebaseapp.com",
  projectId: "vite-contact-49654",
  storageBucket: "vite-contact-49654.appspot.com",
  messagingSenderId: "316460862447",
  appId: "1:316460862447:web:8c248813b844c00ed2041a",
  measurementId: "G-DNZFSM0P2S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db  =getFirestore(app);
