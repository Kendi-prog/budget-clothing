import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
}
from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} 
from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA73Te_mzzcAOAsJrLWoTK3no1olQKCJK0",
  authDomain: "ecommerce-clothing-db-41729.firebaseapp.com",
  projectId: "ecommerce-clothing-db-41729",
  storageBucket: "ecommerce-clothing-db-41729.firebasestorage.app",
  messagingSenderId: "525386244789",
  appId: "1:525386244789:web:50e8955221fce8f20254fc"
};


const FirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDatabaseFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);

    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
          console.log('Error created the user', error.message)
        } 
    }
    return userDocRef; 
    

    
}