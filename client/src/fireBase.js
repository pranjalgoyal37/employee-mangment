import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuhUHaZLPA60R_mugKYURbDGWD8IUiS28",
  authDomain: "employee-managment-syste-a2620.firebaseapp.com",
  projectId: "employee-managment-syste-a2620",
  storageBucket: "employee-managment-syste-a2620.appspot.com",  // Corrected storage URL
  messagingSenderId: "1045700872274",
  appId: "1:1045700872274:web:39bd8240ac34ae1904b78b",
  measurementId: "G-HYRZVJ3J8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
