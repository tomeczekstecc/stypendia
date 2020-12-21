import React from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

const Login = () => {
  return (

      <Segment placeholder style={styles.main} size='large'>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Nazwa użytkownika'
                placeholder='Nazwa użytkownika'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Hasło'
                type='Hasło'
              />

              <Button content='Zaloguj się' primary size="large"/>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Zarejestruj się' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>lub</Divider>
      </Segment>

  );
};

const styles = {
  main:{
    width: '80%',
    marginTop: '50px'
  }
}

export default Login;
