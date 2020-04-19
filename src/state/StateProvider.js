import React, {createContext, useReducer} from 'react';
import InitialState from './InitialState';
import MainReducer from './reducers/MainReducer';
import logger from 'use-reducer-logger';
const StateContext = createContext(InitialState);
const DispatchContext = createContext({});

export const StateProvider = ({children}) =>{


  const [state, dispatch] = useReducer(process.env.NODE_ENV === 'development' ? logger(MainReducer) : MainReducer, InitialState);

  return(
  <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
    {children}
    </DispatchContext.Provider>
  </StateContext.Provider>
)};

export {StateContext, DispatchContext}

