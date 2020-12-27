import React, { useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';

import { SET_USER, CHECK_IS_LOGGED_IN } from '../types';

const AuthState = (props) => {
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
    console.log(result);
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

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        checkIsAuthenticated,
        isLoggedIn: state.isLoggedIn,
        // logOutCallback
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
