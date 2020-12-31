import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,

  Loader,
  Segment,
} from 'semantic-ui-react';
import Title from '../components/Title';

import AuthContext from '../context/auth/authContext';


const Logout= ({ history }) => {



  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;



  useEffect(() => {
    checkIsAuthenticated();
    isLoggedIn && history.push('/');
  }, [isLoggedIn]);


  return (
    <Container>
      <Title content='Logowanie' />
      <Segment placeholder style={styles.main} size='large'>
        <Grid columns={1} relaxed='very' stackable>
          <Grid.Column>
            <Loader active inline='centered' />
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

const styles = {
  main: {
    marginTop: '7rem',
    width: '95%',
    marginBottom: '5rem',
  },
  column: {},
  buttonWrapper: {
    marginTop: '10px',
  },
  ol: {
    fontSize: '.85rem',
    color: '#666',
  },
  intro: {
    fontSize: '.85rem',
    marginLeft: '1.8rem',
    marginTop: '2rem',
    color: '#666',
  },
  input: {
    width: '290px',
    marginLeft: '-35px',
    marginBottom: '20px',
  },
  small: {
    fontSize: '.9rem',
    textAlign: 'center',
    transform: 'translateY(-35px)',
    color: 'red',
  },

  span: {
    fontSize: '1rem',
  },
  link: {},
};

export default Logout;
