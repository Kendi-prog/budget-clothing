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
    User,
    NextOrObserver,
    RecaptchaVerifier,
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
    QueryDocumentSnapshot,
} 
from "firebase/firestore";
import { Category } from "../../store/categories/category.types";



const firebaseConfig = {
  apiKey: "AIzaSyA73Te_mzzcAOAsJrLWoTK3no1olQKCJK0",
  authDomain: "ecommerce-clothing-db-41729.firebaseapp.com",
  projectId: "ecommerce-clothing-db-41729",
  storageBucket: "ecommerce-clothing-db-41729.firebasestorage.app",
  messagingSenderId: "525386244789",
  appId: "1:525386244789:web:50e8955221fce8f20254fc",
  recaptchaKey: "6LdFuAErAAAAAJ_8tBW1Gv8GsoAyghr09HUv0jsA",
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

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocument = async<T extends ObjectToAdd> (
    collectionKey : string, 
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}


export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    //await Promise.reject(new Error('new error woops!!'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        (docSnapShot) => docSnapShot.data() as Category);

}


export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt : Date;
    displayName: string;
    email:string;
}


export const createUserDocumentFromAuth = async (
    userAuth : User, 
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
          console.log('Error created the user', error)
        } 
    }
    return userSnapShot as QueryDocumentSnapshot<UserData>; 
    
    
}

export const createAuthUserWithEmailAndPassword = async ( email:string, password:string) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async ( email:string, password: string) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback : NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () : Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}




declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

// Function to Set Up reCAPTCHA
export const setupRecaptcha = (
    elementId: string,
    setRecaptchaVerified: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const auth = getAuth(FirebaseApp); // ✅ Get the Auth instance
  
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        size: "normal",
        callback: () => {
          setRecaptchaVerified(true); // ✅ reCAPTCHA passed
        },
        "expired-callback": () => {
          setRecaptchaVerified(false); // ❌ reCAPTCHA expired
        },
      });
  
      window.recaptchaVerifier.render();
    }
  };