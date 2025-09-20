// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-9983970986-a01b2",
  "appId": "1:805185559584:web:3655c01c021479c510b045",
  "apiKey": "AIzaSyDZXJvrWNze_KyFxG9v3KVrVcntGaSNLN8",
  "authDomain": "studio-9983970986-a01b2.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "805185559584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
