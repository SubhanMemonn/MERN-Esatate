// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-33d3d.firebaseapp.com",
  projectId: "mern-estate-33d3d",
  storageBucket: "mern-estate-33d3d.appspot.com",
  messagingSenderId: "274214182625",
  appId: "1:274214182625:web:2636ffd9f62997383e21a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)