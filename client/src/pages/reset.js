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
import {Wrapper} from './styles/reset.styles'
import {Title} from '../components';
import {AlertContext,AuthContext , AppContext}from '../context';
import { resetInputs } from '../parts/inputs';

const Reset = ({ location, history }) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

    const appContext = useContext(AppContext);
    const { setIsLoading, isLoading } = appContext;

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
    const client = await axios.get('https://api.my-ip.io/ip.json');
    const clientIp = client.data.ip;

    axios
      .post(`/api/v1/password/reset${location.search}`, {
        ...body,
        _csrf: csrfData.data.csrfToken, clientIp
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
        <Title content='Nowe hasło' />
        <Segment placeholder className='main' size='large'>
          <Message className='msg' info size='small' floating>
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
                <input type='hidden' name='_csrf' value=''></input>
                {resetInputs.map((input) => {
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
    </Wrapper>
  );
};


export default Reset;
