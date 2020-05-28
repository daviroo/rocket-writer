import { put, takeLatest, select, takeEvery } from "redux-saga/effects";
import { SAVE_DOCUMENT, updateDocumentId, saveDocumentSuccess, saveDocumentFailed, LOAD_DOCUMENT, loadDocumentSuccess, loadDocumentFailed, DELETE_DOCUMENT, deleteDocumentFailed, deleteDocumentSuccess, DELETE_DOCUMENT_SUCCESS, resetEditorState } from "../actions/EditorActions";
import firebase from '../../firebase';
import { addDocToDocList } from "../actions/DocumentListActions";
const db = firebase.firestore();

function* saveDocument(){
    try{
        const documentState = yield select(state => state.documentState);
        const accountId = yield select(state => state.authState.accountId);
        var doc;
        if(documentState.id){
            doc = yield db.doc(`accounts/${accountId}/documents/${documentState.id}`).update(documentState.content)
        } else {
            doc = yield db.collection(`accounts/${accountId}/documents/`).add(documentState.content)
            yield put(updateDocumentId(doc.id))
        }
        yield put(saveDocumentSuccess());
        if(doc){
            yield put(addDocToDocList({id: doc.id, title: documentState.content.title, lastUpdated: firebase.firestore.FieldValue.serverTimestamp()}))
        }
    } catch(e){
        console.log(e)
        yield put(saveDocumentFailed(e.message))
    }
}

function* loadDocument(action){
    try{
        const accountId = yield select(state => state.authState.accountId);
        console.log(action)
        const doc = yield db.collection(`accounts/${accountId}/documents/`).doc(`${action.payload}`).get();
        console.log(doc)
        yield put(loadDocumentSuccess({
            content: doc.data(),
            id: doc.id
        }))
    } catch(e){
        console.log(e)
        yield put(loadDocumentFailed("Something went wrong while loading the document."));
    }
}

function* deleteDocument(action){
    try{
        const accountId = yield select(state => state.authState.accountId);
        yield db.collection(`accounts/${accountId}/documents/`).doc(`${action.payload}`).delete()
        yield put(deleteDocumentSuccess(action.payload))
    }catch(e){
        console.log(e)
        yield put(deleteDocumentFailed(e.message));
    }
}

function* checkIfDocumentNeedsCleared(action){
    try{
        const currentDocumentId = yield select(state => state.documentState.id);
        if(currentDocumentId === action.payload){
            yield put(resetEditorState());
        }
    }catch(e){
        console.log(e)
    }
}

export default function* documentSaga(){
    yield takeLatest(SAVE_DOCUMENT, saveDocument);
    yield takeLatest(LOAD_DOCUMENT, loadDocument);
    yield takeEvery(DELETE_DOCUMENT, deleteDocument);
    yield takeEvery(DELETE_DOCUMENT_SUCCESS, checkIfDocumentNeedsCleared)
}