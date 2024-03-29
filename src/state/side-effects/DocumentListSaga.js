import { put, takeLatest, select, call, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import {
  updateDocumentList,
} from "../actions/DocumentListActions";
import firebase from "../../firebase";
import { UPDATE_ACCOUNT_ID } from "../actions/AuthActions";
const db = firebase.firestore();

function subscribeToDocumentList(accountId) {
  return eventChannel((emitter) => {
    const unsubscribe = db
      .collection(`accounts/${accountId}/documentList`)
      .onSnapshot(function (querySnapshot) {
        var documents = [];
        querySnapshot.forEach(function (doc) {
          documents.push({ ...doc.data(), id: doc.id });
        });
        emitter(documents);
      });
    return () => {
      emitter(END);
      unsubscribe();
    };
  });
}

function* subscribeTodocumentListChannel() {
  const accountId = yield select((state) => state.authState.accountId);
  if (accountId) {
    const chan = yield call(subscribeToDocumentList, accountId);
    try {
      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let docs = yield take(chan);
        console.log(`docs: ${docs}`);
        yield put(updateDocumentList(docs));
      }
    } finally {
      console.log("countdown terminated");
    }
  }
}

export default function* documentListSaga() {
  yield takeLatest(UPDATE_ACCOUNT_ID, subscribeTodocumentListChannel);
}
