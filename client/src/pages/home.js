import React, { useContext, u, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import Title from '../components/Title';

const Home = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;
  !isLoggedIn && history.push('/login');
  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return <Title content='Strona statowa' />;
};

export default Home;
