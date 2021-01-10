import React, { useContext, useReducer } from 'react';
import submitReducer from './submitReducer';
import SubmitContext from './submitContext';
import axios from 'axios';
import AlertContext from '../alert/alertContext';

import {
  UPDATE_NEW_SUBMIT,
  SET_SUBMIT_ID,
  SET_SUBMIT_MODE,
  UPDATE_CUR_SUBMIT,
  SET_SUBMIT_TO_WATCH,
  SET_CUR_SUBMIT,
} from '../types';

const SubmitState = (props) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState = {
    newSubmit: {},
    submitUuid: null,
    submitMode: '',
    submitToWatch: {},
    curSubmit: {}, //submit being edited
  };

  const addNewSubmit = (submit) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post('/api/v1/submits', submit, headers)
      .then((data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          addAlert(err.response.data);
          return;
        }
      });
  };

  const updateSubmit = (submit) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .put('/api/v1/submits', submit, headers)
      .then((data) => {console.log(data.data);
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
        }
      })
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

  const updateCurSubmit = (curSubmit) => {
    dispatch({
      type: UPDATE_CUR_SUBMIT,
      payload: curSubmit,
    });
  };

  const setSubmitMode = (mode) => {
    dispatch({
      type: SET_SUBMIT_MODE,
      payload: mode,
    });
  };

  const setSubmitUuid = async (id) => {
    await dispatch({
      type: SET_SUBMIT_ID,
      payload: id,
    });
  };

  const setSubmitToWatch = (uuid) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      axios
        .get(`/api/v1/submits/usersubmits/${uuid}`, headers)
        .then((data) => {
          dispatch({
            type: SET_SUBMIT_TO_WATCH,
            payload: data.data.submit,
          });
        })
        .catch((err) => {
          if (err.response) {
            addAlert(err.response.data);
            return;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurSubmit = (uuid) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      axios
        .get(`/api/v1/submits/usersubmits/${uuid}`, headers)
        .then((data) => {
          dispatch({
            type: SET_CUR_SUBMIT,
            payload: data.data.submit,
          });
        })
        .catch((err) => {
          if (err.response) {
            addAlert(err.response.data);
            return;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SubmitContext.Provider
      value={{
        newSubmit: state.newSubmit,
        updateNewSubmit,
        addNewSubmit,
        setSubmitUuid,
        submitUuid: state.submitUuid,
        updateSubmit,
        setSubmitMode,
        curSubmit: state.curSubmit,
        updateCurSubmit,
        setCurSubmit,
        submitMode: state.submitMode,
        submitToWatch: state.submitToWatch,
        setSubmitToWatch,
      }}
    >
      {props.children}
    </SubmitContext.Provider>
  );
};

export default SubmitState;
