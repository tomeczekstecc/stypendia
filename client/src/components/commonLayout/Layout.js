import React from 'react';
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';
import { Wrapper } from '../styles/layout.styles';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <MainMenu />
      <Grid centered className='grid' verticalAlign='middle'>
        {children}
      </Grid>
    </Wrapper>
  );
};

export default Layout;
