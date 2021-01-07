import React from 'react';
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';

const Layout = ({ children }) => {
  return (
    <>
      <MainMenu />
      <Grid centered style={styles.grid} verticalAlign='middle'>
        {children}
      </Grid>
    </>
  );
};

export default Layout;

const styles = {
  grid: {
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    margin: 'auto'
  },
};
