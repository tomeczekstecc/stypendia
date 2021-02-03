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
import { Wrapper } from './styles/resetSend.styles';
import { Title } from '../components';
import { AlertContext, AuthContext, AppContext } from '../context';
import { resetReqInputs } from '../parts/inputs';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleOnClick = async (e) => {
    setIsLoading(true);
    setErrors('');
    e.preventDefault();

    const csrfData = await axios.get('/api/v1/csrf');

    axios
      .post(`/api/v1/password/email`, {
        ...body,
        _csrf: csrfData.data.csrfToken,
      })
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
                <input type='hidden' name='_csrf' value=''></input>
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
                          className='small-text'
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
