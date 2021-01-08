import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Form,
  Grid,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
import Title from '../components/Title';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { resetInputs } from '../inputs';

const Reset = ({ location, history }) => {
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
      .post(`/api/v1/password/reset${location.search}`, body, headers)
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setUser(data.data.user);
          await setIsLoading(false);
          history.push('/login');
        }
      })
      .catch((err) => {
   
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
      <Title content='Nowe hasło' />
      <Segment placeholder style={styles.main} size='large'>
        <Message style={styles.msg} info size='small' floating>
          <Message.Header>Nowe hasło</Message.Header>
          <p>
            Strona służy do nadawania nowego hasła. Podaj niezbędne dane i
            zapisz zmiany. Pamiętaj, aby nowe hasło posiadało co najmniej 1
            wielką literę, 1 małą oraz 1 cyfrę.
          </p>
        </Message>
        <Grid columns={1} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              {resetInputs.map((input) => {
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
                content='Zapisz nowe hasło'
                primary
                size='large'
                onClick={handleOnClick}
              />
            </Form>
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
  msg: {
    textAlign: 'left',
    marginBottom: '30px',
  },
};

export default Reset;
