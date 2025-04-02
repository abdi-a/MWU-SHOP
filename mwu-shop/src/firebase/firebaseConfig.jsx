import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4YbQC0TKAMP2Iog0k69PE9FJ6rj1Qzn8",
  authDomain: "mwu-shop.firebaseapp.com",
  projectId: "mwu-shop",
  storageBucket: "mwu-shop.firebasestorage.app",
  messagingSenderId: "941576848592",
  appId: "1:941576848592:web:7c7d6e9d9fb1526a930ad5",
  measurementId: "G-X8J3KQJKPH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };