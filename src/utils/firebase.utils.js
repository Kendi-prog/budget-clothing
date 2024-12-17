import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
}
from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    //await Promise.reject(new Error('new error woops!!'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

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
                createdAt,
                ...additionalInformation,
            });
        } catch(error){
          console.log('Error created the user', error.message)
        } 
    }
    return userDocRef; 
    
    
}

export const createAuthUserWithEmailAndPassword = async ( email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async ( email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);