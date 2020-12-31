import React, { useContext, useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';

import { SET_USER, CHECK_IS_LOGGED_IN, LOGOUT_USER } from '../types';

const AuthState = (props) => {

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;




  const initialState = {
    user: null,
    isLoggedIn: false,
  };

  const checkIsAuthenticated = async () => {
    const result = await (
      await fetch('http://localhost:5003/api/v1/users/me', {
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

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

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

  const logOut = () => {

    axios
      .get('/api/v1/users/logout')
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
           await props.history.push('/login');
        }
      })
      .catch(
        (err) => console.log(err.message)
        //   if (err.response.data.alertTitle) {
        //     console.log(err.response.data);

        //     addAlert(err.response.data);
        //   }
        // });
      );

    dispatch({
      type: LOGOUT_USER
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        logOut,
        checkIsAuthenticated,
        isLoggedIn: state.isLoggedIn,
            }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
