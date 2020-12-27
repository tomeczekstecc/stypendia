import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import Title from '../components/Title';

const Home = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;
  useEffect(() => {
    checkIsAuthenticated();
    !isLoggedIn && history.push('/login');
  }, [isLoggedIn]);

  return <Title content='Strona statowa' />;
};

export default Home;
