import React from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

const Register = () => {
  return (
    <Segment placeholder style={styles.main} size='large'>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column style={styles.column}>
          <Container>
            <Header>Utwórz nowego użytkownika</Header>
            <Form>
              <Form.Input
                style={styles.input}
                icon='user'
                iconPosition='left'
                label='Nazwa uzytkownika'
                placeholder='Podaj nazwę użytkownika'
              />
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Imię'
                placeholder='Podaj swoje imię'
              />
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Nazwisko'
                placeholder='Podaj swoje nazwisko'
              />
              <Form.Input
                icon='mail'
                iconPosition='left'
                label='Email'
                placeholder='Podaj swój email'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Hasło'
                type='password'
                placeholder='Powtórz hasło'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Powtórz hasło'
                placeholder='Powtórz hasło'
                type='password'
              />

              <Button content='Zarejestruj się' primary size='large' />
            </Form>
          </Container>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Button content='Zaloguj się' icon='user' size='big' />
        </Grid.Column>
      </Grid>

      <Divider vertical>lub</Divider>
    </Segment>
  );
};

const styles = {
  main: {
    width: '90%',
    marginTop: '50px',
  },
  column:{

  },

};

export default Register;
