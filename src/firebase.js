import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuu6fx5lx23gfeFz-HESRQzgrfuO0UnL0",
  authDomain: "chat-application-2f3bc.firebaseapp.com",
  projectId: "chat-application-2f3bc",
  storageBucket: "chat-application-2f3bc.appspot.com",
  messagingSenderId: "630216776459",
  appId: "1:630216776459:web:7f7fc918714b3aa3daa00e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();