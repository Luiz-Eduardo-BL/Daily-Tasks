// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLZ9isrkt1W08mKueCPekmDkrwv95TYFE",
  authDomain: "daily-tasks-f911c.firebaseapp.com",
  projectId: "daily-tasks-f911c",
  storageBucket: "daily-tasks-f911c.appspot.com",
  messagingSenderId: "140837212555",
  appId: "1:140837212555:web:2cbd021287652e74309f8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;