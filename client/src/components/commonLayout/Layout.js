import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';

const Layout = ({ children }) => {
  return (
    <>
      <MainMenu />
      <Grid container  centered style = {styles.grid} verticalAlign='middle'>
      {children}
      </Grid>
    </>
  );
};

export default Layout;

const styles = {
  grid:{
    width: '85%'
  }
}