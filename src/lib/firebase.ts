
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "insightly-97e71",
  "appId": "1:407952772263:web:89f23f49e1e7cb11eb5f82",
  "storageBucket": "insightly-97e71.firebasestorage.app",
  "apiKey": "AIzaSyDuHIiBGctge4lg0U8J4evpPJsQeRvGCuo",
  "authDomain": "insightly-97e71.firebaseapp.com",
  "measurementId": "G-P8B69FWX4C",
  "messagingSenderId": "407952772263"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
