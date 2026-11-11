import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyCq5Jj6FBtQH-9_z9pyoYK1hM0tuV8hlwE",

    authDomain:
        "chapecomaislimpa.firebaseapp.com",

    projectId:
        "chapecomaislimpa",

    storageBucket:
        "chapecomaislimpa.firebasestorage.app",

    messagingSenderId:
        "984413222070",

    appId:
        "1:984413222070:web:cdc9c7bd0ea8c8dba42217"

};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const db = getFirestore(app);


export {
    auth,
    db
};