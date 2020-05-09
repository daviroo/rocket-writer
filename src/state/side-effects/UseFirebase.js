import {useState, useEffect} from 'react';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../firebase-config';
import "firebase/firestore";
firebase.initializeApp(firebaseConfig);
export const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [accountId, setAccountId] = useState();
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              setUser(user);
                firebase.firestore().doc(`users/${user.uid}`).get().then((doc) => setAccountId(doc.data.account))
            } else {
                setUser(null)
            }
          });
        }, [])

        async function logout(){
            firebase.auth().signOut()
        }
    return [{user, accountId}, {setUser, logout, firebase, setAccountId}];
}