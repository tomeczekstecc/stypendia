import React, { useContext, useReducer, useState } from 'react';

import submitReducer from './submitReducer';
import SubmitContext from './submitContext';
import axios from 'axios';
import AlertContext from '../alert/alertContext';
import AppContext from '../app/appContext';

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

  const appContext = useContext(AppContext);
  const { setIsLoading } = appContext;

  const initialState = {
    newSubmit: {},
    submitUuid: null,
    isSaving: false,
    submitMode: '',
    submitToWatch: {},
    curSubmit: {}, //submit being edited
  };

  // const addNewSubmit = (submit) => {
  //   setIsLoading(true);
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };

  //   axios
  //     .post('/api/v1/submits', submit, headers)
  //     .then((data) => {
  //       if (data.data.resStatus || data.data.resStatus === 'success') {
  //         addAlert(data.data);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         addAlert(err.response.data);
  //         setIsLoading(false);

  //         return;
  //       }
  //     });
  // };

  // const updateSubmit = (submit) => {
  //   setIsLoading(true);
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };

  //   axios
  //     .put('/api/v1/submits', submit, headers)
  //     .then( async(data) => {

  //       if (data.data.resStatus || data.data.resStatus === 'success') {

  //         addAlert(data.data);
  //         setIsLoading(false);
  //       }
  //
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         addAlert(err.response.data);
  //         setIsLoading(false);
  //
  //         return;
  //       }
  //     });
  // };

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
    setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            addAlert(err.response.data);
            setIsLoading(false);
            return;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurSubmit = (uuid) => {
    setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            addAlert(err.response.data);
            setIsLoading(false);
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
        setSubmitUuid,
        submitUuid: state.submitUuid,
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
