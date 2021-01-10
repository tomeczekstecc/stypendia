import React, { useContext } from 'react';
import { Container, Grid, Loader, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { Wrapper } from './styles/logout.styles';
import Title from '../components/Title';
import AuthContext from '../context/auth/authContext';

const Logout = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  return !isLoggedIn ? (
    <Wrapper>
      <Container>
        <Title content='Logowanie' />
        <Segment placeholder className='main' size='large'>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Loader active inline='centered' />
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </Wrapper>
  ) : (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};

export default Logout;
