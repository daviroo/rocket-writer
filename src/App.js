import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './App.css';
import reducers from './state/reducers';
import * as firebase from 'firebase/app';
import firebaseConfig from './firebase-config';
import "firebase/firestore";
import "firebase/auth";
import Main from './Main';
firebase.initializeApp(firebaseConfig);


const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}
const store = createStore(reducers, applyMiddleware(...middlewares))


function App() {
  return (
    <Provider store={store}>
      <Main />
      </Provider>
  );
}

export default App;
