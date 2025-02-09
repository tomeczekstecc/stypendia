import React, { useContext, useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';
import { useHistory } from 'react-router-dom';

import {
  SET_USER,
  CHECK_IS_LOGGED_IN,
  LOGOUT_USER,
  RESET_TIME_LEFT,
  SET_TIME,

} from '../types';

const AuthState = ({ children }) => {
  const history = useHistory();

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState = {
    user: null,
    timeLeft: +process.env.REACT_APP_SESSION_TIMEOUT,
    isLoggedIn: false,

  };

  const checkIsAuthenticated = async () => {
    const result = await (
      await fetch('api/v1/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
    result.resStatus === 'success' ? setIsLoggedIn(true) : setIsLoggedIn(false);

    setUser(result.user);
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const setIsLoggedIn = (is) => {
    dispatch({
      type: CHECK_IS_LOGGED_IN,
      payload: is,
    });
  };


  const resetTimeLeft = () => {
    dispatch({
      type: RESET_TIME_LEFT,
    });
  };

  const setTimeLeft = (time) => {
    dispatch({
      type: SET_TIME,
      payload: time,
    });
  };

  const logOut = async (cause = undefined) => {
    await axios
      .get('/api/v1/users/logout')
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          history.push('/login');
        }
        cause === 'non-active' && alert('Wylogowano z powodu braku aktywności');
        dispatch({
          type: LOGOUT_USER,
        });
      })
      .catch(
        (err) => console.log(err.message)
        //   if (err.response.data.alertTitle) {
        //     console.log(err.response.data);

        //     addAlert(err.response.data);
        //   }
        // });
      );
  };

  useEffect(() => {
    checkIsAuthenticated();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        logOut,
        checkIsAuthenticated,
        isLoggedIn: state.isLoggedIn,
        timeLeft: state.timeLeft,
        resetTimeLeft,
        setTimeLeft,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
