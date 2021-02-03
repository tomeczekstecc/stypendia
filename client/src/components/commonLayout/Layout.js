import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';
import { Wrapper } from '../styles/layout.styles';
import Timer from '../Timer';
import AuthContext from '../../context/auth/authContext';

const Layout = ({ children }) => {

    const authContext = useContext(AuthContext);
    const { isLoggedIn } = authContext;
  return (
    <Wrapper>
      <MainMenu />
      <Grid centered verticalAlign='middle'>
        {children}
        {isLoggedIn && <Timer/>}
      </Grid>
    </Wrapper>
  );
};

export default Layout;
