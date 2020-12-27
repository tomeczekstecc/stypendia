import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import { v4 as uuid4 } from 'uuid';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import Rodo from '../components/Rodo';
import Title from '../components/Title';
import { registerInputs } from '../components/inputs';
import { AlertContext } from '../context/alert/alertContext';

const Register = (props) => {
  const { state, dispatch } = useContext(AlertContext);

  const authContext = useContext(AuthContext);
  const { setUser, checkIsAuthenticated, isLoggedIn } = authContext;
  isLoggedIn && props.history.push('/');

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');
  const [isRodoChecked, setIsRodoChecked] = useState(false);
  const [isRegulationsChecked, setIsRegulationsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post(`${process.env.REACT_APP_ORIGIN}/api/v1/users`, body, headers)
      .then((data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          setIsLoading(false);
          setTimeout(() => props.history.push('/login'), 1500);
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              id: uuid4(),
              type: data.data.resStatus,
              title: data.data.alertTitle,
              message: data.data.msgPL,
            },
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(err.response.data);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: uuid4(),
            type:err.response.data.resStatus,
            title:err.response.data.alertTitle,
            message:err.response.data.msgPL,
          },
        });
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setBody((prevBody) => ({ ...prevBody, [e.target.name]: e.target.value }));
  };

  return (
    <div style={styles.main}>
      <Title content='Dodawanie konta' />
      <Segment placeholder size='large'>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column textAlign='left' verticalAlign='middle'>
            <Header textAlign='center'>Potwierdź niezbędne oświadczenia</Header>

            <Checkbox
              onChange={() => setIsRegulationsChecked(!isRegulationsChecked)}
              // value={isRegulationsChecked}
              checked={isRegulationsChecked}
              label={
                <label>
                  Oświadczam, iż zapoznałam/em się z regulaminem i akceptuję
                  jego postanowienia <span style={{ color: 'red' }}>*</span>
                </label>
              }
            />

            <Rodo />

            <Checkbox
              onChange={() => setIsRodoChecked(!isRodoChecked)}
              // value={isRodoChecked}
              checked={isRodoChecked}
              style={{ marginBottom: '30px' }}
              required
              label={
                <label>
                  Oświadczam, iż zapoznałam/em się z powyższą informacją
                  <span style={{ color: 'red' }}> *</span>
                </label>
              }
            />
          </Grid.Column>
          <Grid.Column style={styles.column}>
            <Container>
              <Header>... podaj swoje dane</Header>
              <Form>
                {registerInputs.map((input) => {
                  return (
                    <div key={input.id}>
                      <Form.Input
                        loading={isLoading}
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
                <Button
                  loading={isLoading}
                  type='submit'
                  content='Zarejestruj się'
                  primary
                  size='large'
                  onClick={handleOnClick}
                  disabled={
                    !isRegulationsChecked || !isRodoChecked ? true : false
                  }
                />
                <div style={styles.buttonWrapper}>
                  <span>Masz już konto?</span>
                  <Button content='Zaloguj się' icon='user' size='mini' />
                </div>
              </Form>
            </Container>
          </Grid.Column>
        </Grid>

        <Divider vertical>oraz</Divider>
      </Segment>
    </div>
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
    // color: errors ? 'red' :'#666',
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

export default Register;
