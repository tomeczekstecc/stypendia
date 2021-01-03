import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, history, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{
            pathname:'/login'
          }}/>;
        }
      }}
    />
  );
};
export default ProtectedRoute;
