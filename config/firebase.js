
import { initializeApp } from "firebase/app";
import 'firebase/auth';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIrTt63U6ChckAoDt8zrzssvccDy_uEqU",
  authDomain: "medicinereminder-382d5.firebaseapp.com",
  projectId: "medicinereminder-382d5",
  storageBucket: "medicinereminder-382d5.appspot.com",
  messagingSenderId: "218464831379",
  appId: "1:218464831379:web:ddf17a16de3c5478294a66"
};

const Firebase = initializeApp(firebaseConfig);

export default Firebase;