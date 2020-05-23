import { put, takeLatest, select, call, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import firebase from "../../firebase";
import {
  loginSuccess,
  updateAccountId,
  LISTEN_FOR_FIREBASE_AUTH_EVENTS,
  LISTEN_FOR_ACCOUNT_ID,
  logoutSuccess,
  LOGOUT,
  listenForAccountId,
} from "../actions/AuthActions";
const db = firebase.firestore();

function firebaseLoginEventsEmitter() {
  return eventChannel((emitter) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            emitter(user);
        }
    });
    return () => {
      emitter(END);
    };
  });
}

function firebaseLogoutEventsEmitter() {
    return eventChannel((emitter) => {
      firebase.auth().onAuthStateChanged(function (user) {
          if(!user){
              emitter(LOGOUT);
          }
      });
      return () => {
        emitter(END);
      };
    });
  }

function firebaseAccountIdEventsEmitter(user) {
  return eventChannel((emitter) => {
    db.doc(`users/${user.uid}`).onSnapshot((doc) => {
        if(doc.exists){
            emitter(doc.data().account)
            emitter(END);
        }
    }
    );
    return () => {
        emitter(END);
      };
  });
}

function* listenForFirebaseLoginEvents() {
  const chan = yield call(firebaseLoginEventsEmitter);
  try {
    while (true) {
        console.log("here")
      // take(END) will cause the saga to terminate by jumping to the finally block
        const user = yield take(chan)
        if(user){
            yield put(loginSuccess(user));
            yield put(listenForAccountId())
        }
    }
  } finally {
    console.log("terminated");
  }
}

function* listenForFirebaseLogoutEvents() {
    const chan = yield call(firebaseLogoutEventsEmitter);
    try {
      while (true) {
          console.log("here")
        // take(END) will cause the saga to terminate by jumping to the finally block
          const event = yield take(chan);
          if(event){
          yield put(logoutSuccess());
          }
      }
    } finally {
      console.log("terminated");
    }
  }

function* listenForAccountIdEvents() {
  const user = yield select((state) => state.authState.user);
  const chan = yield call(firebaseAccountIdEventsEmitter, user);
  try {
    while (true) {
      const accountId = yield take(chan);
      if (accountId) {
        yield put(updateAccountId(accountId));
      }
    }
  } finally {
    console.log("countdown terminated");
  }
}

export default function* authSaga() {
  yield takeLatest(
    LISTEN_FOR_FIREBASE_AUTH_EVENTS, listenForFirebaseLoginEvents
  );
  yield takeLatest(
    LISTEN_FOR_FIREBASE_AUTH_EVENTS, listenForFirebaseLogoutEvents
  );
  yield takeLatest(LISTEN_FOR_ACCOUNT_ID, listenForAccountIdEvents);
}
