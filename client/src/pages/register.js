import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Wrapper } from './styles/register.styles';
import {Rodo,Title}  from '../components';
import { registerInputs } from '../parts/inputs';
import {AlertContext, AppContext,AuthContext } from '../context';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;
  isLoggedIn && props.history.push('/');

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState('');
  const [isRodoChecked, setIsRodoChecked] = useState(false);
  const [isRegulationsChecked, setIsRegulationsChecked] = useState(false);

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault();
    const csrfData = await axios.get('/api/v1/csrf');
    setIsLoading(true);
    const newBody = { ...body, _csrf: csrfData.data.csrfToken };

    axios
      .post(`${process.env.REACT_APP_ORIGIN}/api/v1/users`, newBody)
      .then((data) => {
        console.log(data.data);
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
    <Wrapper>
      <div className='main'>
        <Title content='Dodawanie konta' />
        <Segment placeholder size='large'>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column textAlign='left' verticalAlign='middle'>
              <Header textAlign='center'>
                Potwierdź niezbędne oświadczenia
              </Header>

              <Checkbox
                onChange={() => setIsRegulationsChecked(!isRegulationsChecked)}
                // value={isRegulationsChecked}
                checked={isRegulationsChecked}
                label={
                  <label>
                    Oświadczam, iż zapoznałam/em się z regulaminem i akceptuję
                    jego postanowienia <span>*</span>
                  </label>
                }
              />

              <Rodo />

              <Checkbox
                onChange={() => setIsRodoChecked(!isRodoChecked)}
                // value={isRodoChecked}
                checked={isRodoChecked}
                className='checkBox'
                required
                label={
                  <label>
                    Oświadczam, iż zapoznałam/em się z powyższą informacją
                    <span> *</span>
                  </label>
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Container>
                <Header>... podaj swoje dane</Header>
                <Form>
                  <input type='hidden' name='_csrf' value='_csrf'></input>
                  {registerInputs.map((input) => {
                    return (
                      <div key={input.id}>
                        <Form.Input
                          loading={isLoading}
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
                    content='Zarejestruj się'
                    primary
                    size='large'
                    onClick={handleOnClick}
                    disabled={
                      !isRegulationsChecked || !isRodoChecked ? true : false
                    }
                  />
                </Form>
                <Link to='/login'>
                  <div className='buttonWrapper'>
                    <div className='span'>Masz już konto?</div>
                    <Button content='Zaloguj się' icon='user' size='mini' />
                  </div>
                </Link>
              </Container>
            </Grid.Column>
          </Grid>

          <Divider vertical>oraz</Divider>
        </Segment>
      </div>
    </Wrapper>
  );
};

export default Register;
