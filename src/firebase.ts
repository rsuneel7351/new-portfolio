import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoDpyO_684AFCG3jcNYo9db_dksr1lt98",
  authDomain: "suneel-dev.firebaseapp.com",
  projectId: "suneel-dev",
  storageBucket: "suneel-dev.firebasestorage.app",
  messagingSenderId: "441726191799",
  appId: "1:441726191799:web:4bc21b25da5de1a005e532"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
