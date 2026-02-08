import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBRvPLwpmJoLzeqqfUzIq7VJrq3PTS1iQ",

    authDomain: "gogrub-ggmax.firebaseapp.com",

    projectId: "gogrub-ggmax",

    storageBucket: "gogrub-ggmax.firebasestorage.app",

    messagingSenderId: "441216703846",

    appId: "1:441216703846:web:10fbe984c89035a9b97ca7"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);