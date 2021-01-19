import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app =  firebase.initializeApp({
    apiKey: "AIzaSyBTWU4T3CA-wTdTj9Kz2IZCSP1lLkrgh5o",
    authDomain: "graduaat-programmeren.firebaseapp.com",
    projectId: "graduaat-programmeren",
    storageBucket: "graduaat-programmeren.appspot.com",
    messagingSenderId: "566772243939",
    appId: "1:566772243939:web:b115f96e1a4aeb05af94d6"
});

export { firebase };
export { app as firebaseApp };
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export const currentUser = auth.currentUser

export default app;