// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkv1eqBJaEfY-LAoMWKEH28ktmyQsarl8",
    authDomain: "narwrites.firebaseapp.com",
    projectId: "narwrites",
    storageBucket: "narwrites.appspot.com",
    messagingSenderId: "845545577811",
    appId: "1:845545577811:web:b7c65f3e6b746ea31415a6"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;