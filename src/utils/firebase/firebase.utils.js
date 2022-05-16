import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  refEqual,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBBIGsEPjyhvVZE78cAksCpCQE7By7l0-U",
  authDomain: "sams-clothing-db.firebaseapp.com",
  projectId: "sams-clothing-db",
  storageBucket: "sams-clothing-db.appspot.com",
  messagingSenderId: "497969081025",
  appId: "1:497969081025:web:9248f4ecd2480eb22ec240",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//This is the database that we are going to pass
export const db = getFirestore();

//receives  data from authentication and save that data to firestore.
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //Check to see if snapshots exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //If the user does not exist, Create/set the documents with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //And if the user exists
  return userDocRef;
};
