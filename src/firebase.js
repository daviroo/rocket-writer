import * as firebase from 'firebase/app';
import firebaseConfig from './firebase-config';
import "firebase/firestore";
import "firebase/auth";
firebase.initializeApp(firebaseConfig);
export default firebase;