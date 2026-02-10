import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoaJLR3VNB3L_cjhiZxw1p2GTbcUXhYwQ",
  authDomain: "learn-page.firebaseapp.com",
  projectId: "learn-page",
  storageBucket: "learn-page.firebasestorage.app",
  messagingSenderId: "827477051574",
  appId: "1:827477051574:web:956218ba97b9d831d23e17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();