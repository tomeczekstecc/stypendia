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
import {Wrapper} from './styles/resetSend.styles'
import Title from '../components/Title';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';
import { resetReqInputs } from '../inputs';

const ResetSend = ({ history }) => {

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;


  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { setUser, checkIsAuthenticated, isLoggedIn } = authContext;

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');

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
      .post(`/api/v1/password/email`, {...body}, headers)
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
    <Wrapper>
      <Container>
        <Title content='Resetowanie hasła' />
        <Segment placeholder className='main' size='large'>
          <Message className='msg' info size='small' floating>
            <Message.Header>Resetowanie hasła</Message.Header>
            <p>
              Strona służy do resetowania hasła do konta. Zostanie wygenerowany
              specjalny link oraz przesłany na podany adres email i będzie ważny
              przez <strong>12 godzin</strong>. Jeżeli nie znajdziesz linka
              sprawdź folder <strong> spam</strong> w Twojej poczcie. W
              formularzu poniżej podaj nazwę użytkownika oraz email, które
              podałaś/eś w trakcie rejestracji.
            </p>
          </Message>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                {resetReqInputs.map((input) => {
                  return (
                    <div key={input.id}>
                      <Form.Input
                        onChange={(e) => handleOnChange(e)}
                        required
                        className='input'
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
                          className='small'
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
    </Wrapper>
  );
};


export default ResetSend;
