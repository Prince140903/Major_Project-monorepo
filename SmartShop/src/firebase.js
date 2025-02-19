// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_AP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_AP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_AP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_AP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_AP_FIREBASE_STORAGE_APP_ID,

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
