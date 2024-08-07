// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Qccb5AZ4S6wV8MfLkboZcSNfoNV0XXA",
  authDomain: "africare-health.firebaseapp.com",
  projectId: "africare-health",
  storageBucket: "africare-health.appspot.com",
  messagingSenderId: "85569078068",
  appId: "1:85569078068:web:c901c32a1a84c939681b61",
  measurementId: "G-DPBH9XP13X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);





//Initialize firebase authentication
export const auth = getAuth(app);
export const db = getFirestore(app);
