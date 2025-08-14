// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNId_chAF6JVm1y1MkBk2rAjLsQxOA7dk",
  authDomain: "quiz-code-conduite.firebaseapp.com",
  projectId: "quiz-code-conduite",
  storageBucket: "quiz-code-conduite.firebasestorage.app",
  messagingSenderId: "558867572992",
  appId: "1:558867572992:web:baf2f7f5f7a1281eeb6be5"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// Expose global (facile d’accès depuis script.js)
window.db = db;

