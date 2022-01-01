// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoHs4Kjf1w60F4JADojX5aGmT0tTDuKa0",
  authDomain: "gransaga-yuna.firebaseapp.com",
  projectId: "gransaga-yuna",
  storageBucket: "gransaga-yuna.appspot.com",
  messagingSenderId: "102731584840",
  appId: "1:102731584840:web:a1314c48eb206dab720f7d",
  measurementId: "G-4VR4555QT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);