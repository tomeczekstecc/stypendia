import React, { useReducer } from 'react';
import { v4 as uuid4 } from 'uuid';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../types';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const initialState = [];

const AlertState = (props) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const addAlert = (data) => {

    const id = uuid4();
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { ...data, id },
    });
  };


  const deleteAlert = (id) => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id
    });
  };




  return (
    <AlertContext.Provider value={{ alerts: state, addAlert, deleteAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
