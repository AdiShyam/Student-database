import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyB6_NsBPgDoF43QV2QkSLo5jlE8sN-im2E",
    authDomain: "student-database-b7a2a.firebaseapp.com",
    databaseURL: "https://student-database-b7a2a.firebaseio.com",
    projectId: "student-database-b7a2a",
    storageBucket: "student-database-b7a2a.appspot.com",
    messagingSenderId: "321363244404",
    appId: "1:321363244404:web:25a3c932aaa51ffbfae821",
    measurementId: "G-S7PV5CSB2T"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
      return;
    }
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await userRef.set({ displayName, email, createdAt, ...additionalData })
      } catch (error) {
        // console.log("error creating user"+ error);
      }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider =  new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;