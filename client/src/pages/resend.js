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

import { Wrapper } from './styles/resend.styles';
import { Title } from '../components';
import { AlertContext, AuthContext, AppContext } from '../context';

const Resend = ({ history }) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const authContext = useContext(AuthContext);
  const { setUser, checkIsAuthenticated, isLoggedIn } = authContext;

  const [email, setEmail] = useState({});
  const [errors, setErrors] = useState('');

  useEffect(() => {
    checkIsAuthenticated();
    isLoggedIn && history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleOnClick = async (e) => {
    setErrors('');
    e.preventDefault();
    setIsLoading(true);
    // const csrfData = await axios.get('/api/v1/csrf');
    // const newBody = { email, _csrf: csrfData.data.csrfToken };
    axios
      .post(`/api/v1/email/resend`, { email })
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setUser(data.data.user);
          await setIsLoading(false);
          history.push('/');
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

  return (
    <Wrapper>
      <Container>
        <Title content='Potwierdzanie konta' />
        <Segment placeholder className='main' size='large'>
          <Message className='msg' info size='small' floating>
            <Message.Header>
              Ponowne wysłanie linka do potwierdzenia konta
            </Message.Header>
            <p>
              Strona służy do ponownego wysłania linka potwierdzającego konto,
              jeżeli konto już założyłaś/eś, ale nie skorzystałaś/eś z niego w
              odpowiednim czasie. Link zostanie przesłany na podany adres email
              i będzie ważny przez <strong>12 godzin</strong> . Jeżeli nie
              znajdziesz linka sprawdź folder <strong> spam</strong> w Twojej
              poczcie.
            </p>
          </Message>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <input type='hidden' name='_csrf' value=''></input>
                <Form.Input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='input'
                  icon='mail'
                  iconPosition='left'
                  label='Email'
                  placeholder='Podaj email'
                  type='email'
                  name='email'
                />

                {errors && errors.email && (
                  <Label basic color='red' pointing='above' className='small'>
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
    </Wrapper>
  );
};

export default Resend;
