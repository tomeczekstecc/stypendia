import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { v4 as uuid4 } from 'uuid';

const Verify = ({ location: { search }, history }) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

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
        addAlert(data.data);
      })
      .catch((err) => {
        console.log(err);
        addAlert(err.response.data);
      });
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Verify</h1>
    </div>
  );
};

export default Verify;
