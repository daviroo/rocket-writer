import React from 'react';
import './App.css';
import { StateProvider } from './state/StateProvider';
import Layout from './layout/Layout'

function App() {
  return (
    <StateProvider>
      <Layout/>
    </StateProvider>
  );
}

export default App;
