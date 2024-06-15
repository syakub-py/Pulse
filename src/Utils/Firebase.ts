// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAS0OLIeH01QAyHZQxILWWUu3I2PJm3xz4',
    authDomain: 'nyle-bd594.firebaseapp.com',
    projectId: 'nyle-bd594',
    storageBucket: 'nyle-bd594.appspot.com',
    messagingSenderId: '616674242131',
    appId: '1:616674242131:web:7788508192e82a84b660a6',
    measurementId: 'G-70E5N2DBMC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
