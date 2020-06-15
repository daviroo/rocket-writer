import { put, takeLatest, select, call, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import {
  updateDocumentList,
} from "../actions/DocumentListActions";
import firebase from "../../firebase";
import { UPDATE_ACCOUNT_ID } from "../actions/AuthActions";
import { UPDATE_DOCUMENT_ID, LOAD_DOCUMENT, updateDocumentWarnings } from "../actions/EditorActions";
const db = firebase.firestore();

var subscriptions =  [];

function subscribeToDocumentWarnings(accountId, documentId) {
  return eventChannel((emitter) => {
    const unsubscribe = db
      .collection(`accounts/${accountId}/documentWarnings`)
      .doc(documentId)
      .onSnapshot(function (doc) {
          if(doc.exists){
        emitter(doc.data(), documentId);
          }
      });
      subscriptions.push({
          id: documentId,
          cancelSubscription: () => {
            emitter(END);
            unsubscribe();
          },
      })
    return () => {
      emitter(END);
      unsubscribe();
    };
  });
}

function* subscribeTodocumentWarningsChannel(action) {
  const accountId = yield select((state) => state.authState.accountId);
  if(subscriptions.find(subscription => subscription.id === action.payload)){
      // subscription already exists for this document
      return;
  }
  if(subscriptions.length > 1){
    subscriptions = subscriptions.sort((e1, e2) => e2.id === action.payload ? -1 : 0);
    subscriptions.splice(1, subscriptions.length)
  }
  if (accountId) {
    const chan = yield call(subscribeToDocumentWarnings, accountId, action.payload);
    try {
      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let doc = yield take(chan);
        console.log(`warnings: ${doc}`);
        yield put(updateDocumentWarnings(doc));
      }
    } finally {
      console.log("countdown terminated");
    }
  }
}

export default function* documentListSaga() {
    yield takeLatest(LOAD_DOCUMENT, subscribeTodocumentWarningsChannel);
    yield takeLatest(UPDATE_DOCUMENT_ID, subscribeTodocumentWarningsChannel);
}
