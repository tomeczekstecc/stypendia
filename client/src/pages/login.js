import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import axios from 'axios';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react';
import Title from '../components/Title';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { loginInputs } from '../components/inputs';

const Login = ({ history }) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { setUser, checkIsAuthenticated, isLoggedIn } = authContext;

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIsAuthenticated();
    isLoggedIn && history.push('/');
  }, [isLoggedIn]);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post(`/api/v1/users/login`, body, headers)
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setUser(data.data.user);
          await setIsLoading(false);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.alertTitle) {
          setIsLoading(false);
          addAlert(err.response.data);
        }

        setErrors(err.response.data);
        setIsLoading(false);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setBody((prevBody) => ({ ...prevBody, [e.target.name]: e.target.value }));
  };

  return (
    <Container>
      <Title content='Logowanie' />
      <Segment placeholder style={styles.main} size='large'>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              {loginInputs.map((input) => {
                return (
                  <div key={input.id}>
                    <Form.Input
                      onChange={(e) => handleOnChange(e)}
                      required
                      style={styles.input}
                      icon={input.icon}
                      iconPosition='left'
                      label={input.label}
                      placeholder={input.placeholder}
                      type={input.type}
                      name={input.name}
                    />
                    <div key={input.id} style={styles.small}>
                      {errors && errors[input.name]}
                    </div>
                  </div>
                );
              })}
              <span>{}</span>
              <Button
                loading={isLoading}
                type='submit'
                content='Zaloguj się'
                primary
                size='large'
                onClick={handleOnClick}
              />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Zarejestruj się' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>lub</Divider>
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
  },
  small: {
    marginBottom: '30px',
    fontSize: '.85rem',
    textAlign: 'center',

    marginTop: '-.9rem',
    color: 'red',
  },
};

export default Login;
