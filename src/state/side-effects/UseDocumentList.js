import {useState, useEffect} from 'react';
import { useFirebase } from './UseFirebase';
export const useDocumentList = () => {
    const [{accountId}, {firebase}] = useFirebase()
    const db = firebase.firestore();
    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        if(accountId){
            db.collection("accounts").doc(accountId)
            .onSnapshot(function(doc) {
                setDocumentList(doc.data().documentList);
            });
        }
    }, [db, accountId]) 
    
    return [documentList, setDocumentList]
}
