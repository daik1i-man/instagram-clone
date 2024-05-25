import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAfxjgN4EgcLNvVhUb_2BvNnNIO-On3XQg",
    authDomain: "instagram-3a876.firebaseapp.com",
    projectId: "instagram-3a876",
    storageBucket: "instagram-3a876.appspot.com",
    messagingSenderId: "820063869549",
    appId: "1:820063869549:web:5db5406d3bd186eaabbd64"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getFirestore(app);
const storage = getStorage(app);

export { auth, store, storage }