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


const Resend = ({ history }) => {
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
      <Title content='Potwierdzanie konta' />
      <Segment placeholder style={styles.main} size='large'>
        <Message style={styles.msg} info size='small' floating>
          <Message.Header>
            Ponowne wysłanie linka do potwierdzenia konta
          </Message.Header>
          <p>
            Strona służy do ponownego wysłania linka potwierdzającego konto, jeżeli konto już założyłaś/eś, ale nie skorzystałaś/eś z niego w odpowiednim czasie.
            Link zostanie przesłany na podany adres email i będzie ważny przez 'XXX' minut. Jeżeli nie otrzymasz linka sprawdź folder  <strong> spam</strong> w Twojej poczcie.
          </p>
        </Message>
        <Grid columns={1} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                onChange={(e) => handleOnChange(e)}
                required
                style={styles.input}
                icon='mail'
                iconPosition='left'
                label='Email'
                placeholder='Podaj email'
                type='email'
                name='email'
              />

              {errors && (
                <Label basic color='red' pointing='above' style={styles.small}>
                  {errors.email}
                </Label>
              )}

              <Button
                loading={isLoading}
                type='submit'
                content='Wyślij link'
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

export default Resend;
