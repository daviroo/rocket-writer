import { put, takeLatest, select } from "redux-saga/effects";
import { SAVE_DOCUMENT, updateDocumentId, saveDocumentSuccess, saveDocumentFailed } from "../actions/EditorActions";
import firebase from '../../firebase';
const db = firebase.firestore();
function* saveDocument(){
    try{
        const documentState = yield select(state => state.documentState);
        const accountId = yield select(state => state.authState.accountId);
        console.log(documentState)
        console.log(accountId)
        if(documentState.id){
            yield db.doc(`accounts/${accountId}/documents/${documentState.id}`).update(documentState.content)
        } else {
            const doc = yield db.collection(`accounts/${accountId}/documents/`).add(documentState.content);
            yield put(updateDocumentId(doc.id))
        }
        yield put(saveDocumentSuccess());
    } catch(e){
        console.log(e)
        yield put(saveDocumentFailed(e.message))
    }
}

export default function* documentSaga(){
    yield takeLatest(SAVE_DOCUMENT, saveDocument);
}