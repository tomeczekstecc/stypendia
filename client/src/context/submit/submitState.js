import React, { useContext, useReducer } from 'react';
import submitReducer from './submitReducer';
import SubmitContext from './submitContext';
import axios from 'axios';
import AlertContext from '../alert/alertContext';
// import AuthContext from '../auth/authContext';

import { UPDATE_NEW_SUBMIT, SET_SUBMIT_ID } from '../types';

const SubmitState = (props) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  // const authContext = useContext(AuthContext);
  // const { user } = authContext;

  const initialState = {
    newSubmit: {},
  };

  const addNewSubmit = (submit) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post('/api/v1/submits', submit, headers)
      .then((data) => addAlert(data.data))
      .catch((err) => {
        if (err.response) {
               addAlert(err.response.data);
          return;
        }
      });
  };

  const [state, dispatch] = useReducer(submitReducer, initialState);

  const updateNewSubmit = (newSubmit) => {
    dispatch({
      type: UPDATE_NEW_SUBMIT,
      payload: newSubmit,
    });
  };

  const setSubmitId = (id) => {
    dispatch({
      type: SET_SUBMIT_ID,
      payload: id,
    });
  };



  return (
    <SubmitContext.Provider
      value={{
        newSubmit: state.newSubmit,
    updateNewSubmit,
        addNewSubmit,
        setSubmitId,
        submitId: state.submitId,
      }}
    >
      {props.children}
    </SubmitContext.Provider>
  );
};

export default SubmitState;
