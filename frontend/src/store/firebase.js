import firebase from './firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBQXIvUciOUzjDbqKNJgGWPZM0JCNPO-Oc",
  authDomain: "greensinternal.firebaseapp.com",
  projectId: "greensinternal",
  storageBucket: "greensinternal.appspot.com",
  messagingSenderId: "392837528515",
  appId: "1:392837528515:web:bec9984e7de37800de1b76",
  measurementId: "G-0BTHRWSD34"
};

  
firebase.initializeApp(firebaseConfig);

export { firebase };

/*
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQXIvUciOUzjDbqKNJgGWPZM0JCNPO-Oc",
  authDomain: "greensinternal.firebaseapp.com",
  projectId: "greensinternal",
  storageBucket: "greensinternal.appspot.com",
  messagingSenderId: "392837528515",
  appId: "1:392837528515:web:bec9984e7de37800de1b76",
  measurementId: "G-0BTHRWSD34"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);


export { db, firebase}; 

*/