import React, { useContext, useReducer } from 'react';
import submitReducer from './submitReducer';
import SubmitContext from './submitContext';
import axios from 'axios';
import AlertContext from '../alert/alertContext';

import { UPDATE_CURRENT_SUBMIT, SET_SUBMIT_ID } from '../types';

const SubmitState = (props) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState = {
    currentSubmit: {},
  };

  const addNewSubmit = (submit) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post('/api/v1/submits', submit, headers)
      .then((data) => addAlert(data.data))
      .catch((err) => {
        if (err.response.data.forcePassChange) {
          addAlert(err.response.data);
          return;
        }
      });
  };

  const [state, dispatch] = useReducer(submitReducer, initialState);

  const updateCurrentSubmit = (currentSubmit) => {
    dispatch({
      type: UPDATE_CURRENT_SUBMIT,
      payload: currentSubmit,
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
        currentSubmit: state.currentSubmit,
        updateCurrentSubmit,
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
