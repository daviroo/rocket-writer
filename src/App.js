import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from "redux-saga";
import './App.css';
import reducers from './state/reducers';
import Main from './Main';
import rootSaga from './state/side-effects/RootSaga';


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Main />
      </Provider>
  );
}

export default App;
