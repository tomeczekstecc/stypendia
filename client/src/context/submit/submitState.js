import React, { useContext, useReducer } from 'react';

import submitReducer from './submitReducer';
import SubmitContext from './submitContext';
import axios from 'axios';
import AlertContext from '../alert/alertContext';
import AppContext from '../app/appContext';
import AuthContext from '../auth/authContext';

import {
  UPDATE_NEW_SUBMIT,
  SET_SUBMIT_ID,
  SET_SUBMIT_MODE,
  UPDATE_CUR_SUBMIT,
  SET_SUBMIT_TO_WATCH,
  SET_CUR_SUBMIT,
  SET_SUBMIT_ERRORS,
  SET_TEMP_UUID,
  CLEAR_CUR_SUBMIT,
  CLEAR_NEW_SUBMIT,
  CLEAR_SUBMIT_TO_WATCH,
} from '../types';

const SubmitState = (props) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

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
    submitErrors: null,
    subjectsOptions: null,
    tempUuid: '',
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
      type: SET_TEMP_UUID,
    });

    if (mode === 'new') {

      dispatch({
        type: CLEAR_CUR_SUBMIT,
      });
      dispatch({
        type: CLEAR_SUBMIT_TO_WATCH,
      });
    } else if (mode === 'edit') {
      dispatch({
        type: CLEAR_NEW_SUBMIT,
      });
      dispatch({
        type: CLEAR_SUBMIT_TO_WATCH,
      });
    } else {
      dispatch({
        type: CLEAR_NEW_SUBMIT,
      });
      dispatch({
        type: CLEAR_CUR_SUBMIT,
      });
    }

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

  const setSubmitErrors = async (errors) => {
    await dispatch({
      type: SET_SUBMIT_ERRORS,
      payload: errors,
    });
  };

  const setSubmitToWatch = (uuid) => {
    setIsLoading(true);
    try {
      isLoggedIn &&
        axios
          .get(`/api/v1/submits/usersubmits/${uuid}`)
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
      isLoggedIn &&
        axios
          .get(`/api/v1/submits/usersubmits/${uuid}`)
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
        submitErrors: state.submitErrors,
        setSubmitErrors,
        tempUuid: state.tempUuid,
      }}
    >
      {props.children}
    </SubmitContext.Provider>
  );
};

export default SubmitState;
