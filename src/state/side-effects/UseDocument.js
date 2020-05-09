import {useState, useEffect, useCallback} from 'react';
import {useFirebase} from './UseFirebase';
import { useReadibilityMetrics } from './UseReadibilityMetrics';
export const useDocument = () => {
    const [{accountId}, {firebase}] = useFirebase()
    const [,{refreshStats}] = useReadibilityMetrics();

    const db = firebase.firestore();
    const [currentDocument, setCurrentDocument] = useState({
        id: "",
        title: "",
        body: [
            {
              type: 'paragraph',
              children: [
                { text: '' },
              ],
            }
          ],
        keywords: []
    })
    const currentDocumentId = currentDocument.id
    const fetchDocument = useCallback(async () => {
        if(accountId && currentDocumentId){
        const doc = await db.collection(`accounts/${accountId}/documents`).doc(currentDocumentId).get();
        setCurrentDocument({
            id: doc.data.id,
            title: doc.data.title,
            body: doc.data.body,
            keywords:doc.data.keywords
        })
    }
}, [db, accountId, currentDocumentId])

    useEffect(() => {
        if(currentDocumentId){
            fetchDocument()
        }
    }, [currentDocumentId, fetchDocument]) 

    useEffect(() => {
        console.log(currentDocument)
        refreshStats();
    }, [currentDocument, refreshStats])

    function setCurrentDocumentBody(value){
        setCurrentDocument({...currentDocument, body: value.concat([])})
    }

    function setCurrentDocumentTitle(value){
        setCurrentDocument({...currentDocument, title: value})
    }

    // function setCurrentDocumentKeywords(value){
    //     setCurrentDocument({...currentDocument, keywords: value})
    // }

    function addDocumentKeyword(value){
        setCurrentDocument({...currentDocument, keywords: currentDocument.keywords.concat([value])})
    }

    function removeDocumentKeyword(value){
        setCurrentDocument({...currentDocument, keywords: currentDocument.keywords.filter((v) => v !== value)})
    }

    function setDocumentId(value){
        setCurrentDocument({...currentDocument, id: value})
    }

    async function saveDocument(){
        if(currentDocument.id){
            await db.doc(`accounts/${accountId}/documents/${currentDocument.id}`).update(currentDocument)
        } else {
            const doc = await db.collection(`accounts/${accountId}/documents/`).add(currentDocument);
            setDocumentId(doc.id)
        }
    }
    
    return [currentDocument, {setCurrentDocumentBody, setCurrentDocumentTitle, addDocumentKeyword, removeDocumentKeyword, saveDocument}]
}
