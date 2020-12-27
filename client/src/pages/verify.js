import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { v4 as uuid4 } from 'uuid';

const Verify = ({ location: { search }, history }) => {
  const { dispatch } = useContext(AlertContext);

  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;
  isLoggedIn && history.push('/');

  const [query, setQuery] = useState(search);

  useEffect(() => {
    checkIsAuthenticated();

    axios
      .post(`/api/v1/email/verify${query}`)
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: uuid4(),
            type: data.data.resStatus,
            title: data.data.alertTitle,
            message: data.data.msgPL,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: uuid4(),
            type: err.response.data.resStatus,
            title: err.response.data.alertTitle,
            message: err.response.data.msgPL,
          },
        });
      });
  }, []);

  return (
    <div>
      <h1>Verify</h1>
    </div>
  );
};

export default Verify;
