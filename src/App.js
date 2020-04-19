import React from 'react';
import './App.css';
import { StateProvider } from './state/StateProvider';
import Layout from './layout/Layout'
import * as firebase from 'firebase/app';
import firebaseConfig from './firebase-config'

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <StateProvider>
      <Layout/>
    </StateProvider>
  );
}

export default App;
