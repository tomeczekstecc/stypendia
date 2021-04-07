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
import { Wrapper } from './styles/changePass.styles';
import Title from '../components/Title';
import { AlertContext, AppContext, AuthContext } from '../context';
import { changePassInputs } from '../parts/inputs';
import { clearValidation } from '../utils';

const ChangePass = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');

  const handleOnClick = async (e) => {
    e.preventDefault();
    const csrfData = await axios.get('/api/v1/csrf');
    const client = await axios.get('https://api.my-ip.io/ip.json');
    const clientIp = client.data.ip;

    setIsLoading(true);

    axios
      .post(`/api/v1/changepass`, {
        ...body,
        _csrf: csrfData.data.csrfToken,
        clientIp,
      })
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
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
  const handleOnChange = (e) => {
    e.preventDefault();
    clearValidation(e, errors);
    setBody((prevBody) => ({ ...prevBody, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    resetTimeLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title content='Zmiana hasła' />
        <Segment placeholder className='main' size='large'>
          <Message className='msg' info size='small' floating>
            <Message.Header>Zmiana hasła</Message.Header>
            <p>
              Strona służy do zmiany hasła. Podaj obowiązujące i nowe hasło i
              zapisz zmiany. Pamiętaj, aby nowe hasło posiadało co najmniej 1
              wielką literę, 1 małą oraz 1 cyfrę.
            </p>
          </Message>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <input type='hidden' name='_csrf' value=''></input>
                {changePassInputs.map((input) => {
                  return (
                    <div key={input.id}>
                      <Form.Input
                        aria-label='input'
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
                  className='buttonik1'
                  loading={isLoading}
                  type='submit'
                  content='Zmień hasło'
                  primary
                  size='large'
                  onClick={handleOnClick}
                />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Wrapper>
    </Container>
  );
};

export default ChangePass;
