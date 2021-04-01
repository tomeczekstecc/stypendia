import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Wrapper } from './styles/login.styles';
import { Required, Title } from '../components';
import { AlertContext, AppContext, AuthContext } from '../context';
import { loginInputs } from '../parts/inputs';
import { clearValidation } from '../utils';
import ImportantLinks from '../components/ImportantLinks';

const Login = () => {
  const history = useHistory();
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');

  useEffect(() => {
    checkIsAuthenticated();
    isLoggedIn && history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const csrfData = await axios.get('/api/v1/csrf');
    const client = await axios.get('https://api.my-ip.io/ip.json');
    const clientIp = client.data.ip;

    const newBody = { ...body, _csrf: csrfData.data.csrfToken, clientIp };

    axios
      .post(`/api/v1/users/login`, newBody)
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setIsLoading(false);

          history.push('/');
        }
      })
      .catch((err) => {
        if (err.response?.data?.forcePassChange) {
          addAlert(err.response.data);
          setIsLoading(false);
          history.push(
            `/reset?id=${err.response.data.resetId}&token=${err.response.data.token}`
          );

          return;
        }

        if (err.response?.data?.alertTitle) {
          setIsLoading(false);
          addAlert(err.response.data);
        }

        setErrors(err.response?.data);
        setIsLoading(false);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    clearValidation(e, errors);

    setBody((prevBody) => ({ ...prevBody, [e.target.name]: e.target.value }));
  };

  return (
    <Wrapper>
      <Container>
        <Title content='Logowanie' />
          <Message
            className='intro-warning'
            warning
            header='Uwaga. Wersja testowa'
            content='Niniejsza wersja ma charakter testowy - rozwojowy. Kolejne funkcje są sukcesywnie wdrażane i dostosowywane, błędy obsługiwane. Zapisane
                dane są okesowo usuwane z bazy danych. Używaj tylko dane odpowiednie dla warunków testowych.'
          />
        <Segment placeholder className='main-segment' size='large'>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <input type='hidden' name='_csrf' value='_csrf'></input>
                {loginInputs.map((input) => {
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
                <span>{}</span>
                <Button
                  loading={isLoading}
                  type='submit'
                  content='Zaloguj się !'
                  primary
                  size='large'
                  onClick={handleOnClick}
                />
              </Form>
              <Link to='/resetsend'>
                <div className='buttonWrapper'>
                  <div className='span'>Zapomniałeś hasła?</div>
                  <Button content='Resetuj hasło' icon='recycle' size='mini' />
                </div>
              </Link>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              {' '}
              <Link to='/register'>
                <Button content='Zarejestruj się' icon='user plus' size='big' />
              </Link>
            </Grid.Column>
          </Grid>

          <Divider className='divider' content='lub' vertical />
          <Required />
        </Segment>
        <ImportantLinks />
        <div className='logo'>
          <img src={logo} alt='logo UE' />
          <p>
            Projekt współfinansowany przez Unię Europejską ze środków
            Europejskiego Funduszu Społecznego w ramach Regionalnego Programu
            Operacyjnego Województwa Śląskiego na lata 2014-2020
          </p>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Login;
