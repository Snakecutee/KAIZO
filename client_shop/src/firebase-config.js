import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1bvkh5AE83rkAPyaHG8IM2lUZWWp2wg4",
    authDomain: "login-9bc19.firebaseapp.com",
    projectId: "login-9bc19",
    storageBucket: "login-9bc19.firebasestorage.app",
    messagingSenderId: "553944134937",
    appId: "1:553944134937:web:e76e9157c671601aa1c188"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };