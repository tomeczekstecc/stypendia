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
  Label,
  Segment,
} from 'semantic-ui-react';
import Rodo from '../components/Rodo';
import Title from '../components/Title';
import { registerInputs } from '../components/inputs';
import AlertContext from '../context/alert/alertContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

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
          addAlert(data.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(err.response.data);
        addAlert(err.response.data);
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
                      {errors && errors[input.name] && (
                        <Label
                          basic
                          color='red'
                          pointing='above'
                          key={input.id}
                          style={styles.small}
                        >
                          {errors[input.name]}
                        </Label>
                      )}
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
              </Form>
              <div style={styles.buttonWrapper}>
                <div style={styles.span}>Masz już konto?</div>
                <Button
                   content='Zaloguj się'
                  icon='user'
                  size='mini'
                />
              </div>
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

  buttonWrapper: {
    marginTop: '20px',
  },
  span: {
     fontSize: '1rem',
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
};

export default Register;
