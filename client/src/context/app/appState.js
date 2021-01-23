import React, { useReducer } from 'react';
import appReducer from './appReducer';
import AppContext from './appContext';
import {saveRollbar} from '../../services/saveRollbar'

import { SET_IS_LOADING } from '../types';

const AppState = (props) => {
  const initialState = {
    isLoading: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const setIsLoading = (is) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: is,
    });
  };

  return (
    <AppContext.Provider
      value={{
        saveRollbar,
        setIsLoading,
        isLoading: state.isLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
