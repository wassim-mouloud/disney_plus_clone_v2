// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeFtrRrEzCLnRji5_GZETlwH46Rpc6l_0",
  authDomain: "disneyplus-f1110.firebaseapp.com",
  projectId: "disneyplus-f1110",
  storageBucket: "disneyplus-f1110.appspot.com",
  messagingSenderId: "472763346131",
  appId: "1:472763346131:web:e3e3cc254846f6d845b826",
  measurementId: "G-F5LX7X84JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()