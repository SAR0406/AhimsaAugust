// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_GpRK0m_yoz0j0k2_1qr6IBremtWi72s",
  authDomain: "ahimsa-august.firebaseapp.com",
  projectId: "ahimsa-august",
  storageBucket: "ahimsa-august.appspot.com",
  messagingSenderId: "1067986813394",
  appId: "1:1067986813394:web:4d1f1a8da87529569c080b",
  measurementId: "G-GH0M2YMN3G"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
if (typeof window !== 'undefined') {
    try {
        getAnalytics(app);
    } catch (error) {
        console.log('Failed to initialize Analytics', error);
    }
}

export { app };