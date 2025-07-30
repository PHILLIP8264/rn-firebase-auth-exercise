// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw53j3ZqBAQFO_aiMIOebFRK8UxNiGMzA",
  authDomain: "class-activeties.firebaseapp.com",
  projectId: "class-activeties",
  storageBucket: "class-activeties.firebasestorage.app",
  messagingSenderId: "253070327629",
  appId: "1:253070327629:web:a69f6644fe7145909cc104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, app, db };
