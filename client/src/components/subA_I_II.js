import React, { useContext, useState } from 'react';
import { Form, Grid, Header, Label } from 'semantic-ui-react';
import SubALayout from './subALayout';

import AuthContext from '../context/auth/authContext';

const options = [
  { key: 'p', text: 'Rodzic/Opiekun prawny', value: false },
  { key: 'u', text: 'Pełnoletni uczeń', value: true },
];

const SubA_I_II = () => {
  const authContext = useContext(AuthContext);
  const { user, checkIsAuthenticated, isLoggedIn } = authContext;

  const [body, setBody] = useState({});

  const handleOnChange = (e) => {
    console.log(e);
    e.preventDefault();
    setBody((prevBody) => ({
      ...prevBody,
      [e.target.name]: e.target.value,
    }));
    console.log(body.isSelf);
  };

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          I. DANE OSOBOWE WNIOSKODAWCY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              label='Imię wnioskodawcy'
              name='firstName'
              icon='user'
              iconPosition='left'
              value={user.firstName}
            />
            <Form.Input
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko wnioskodawcy'
              name='lastName'
              value={user.lastName}
            />

            <Form.Input
              className='input'
              label='Email wnioskodawcy'
              icon='at'
              iconPosition='left'
              placeholder='Podaj email wnioskodawcy'
              name='phone'
              value={user.email}
            />
            <Form.Input
              className='input'
              label='Numer telefonu wnioskodawcy'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu wnioskodawcy'
              type='phone'
              name='phone'
            />
            <Form.Input
              className='input'
              icon='box'
              iconPosition='left'
              label='Adres skrzynki ePuap (opcjonalnie)'
              placeholder='Podaj adres ePuap (opcjonalnie)'
              name='epuapAdr'
            />
            {/* <Form.Select
              className='input'
              label='Status wnioskodawcy'
              options={options}
              placeholder='Wybierz status'
              name='status'
              onChange={(e) => handleOnChange(e)}
            /> */}
            <div className='select-wrapper'>
              <Header className='select-header' as='h5'>
                Status Wnioskodawcy
              </Header>
              <select name='isSelf' onChange={(e) => handleOnChange(e)}>
                {options.map((o) => (
                  <option key={o.key} value={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Header className='sub-header' floated='left' as='h4'>
          II. DANE OSOBOWE UCZNIA:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              placeholder='Podaj PESEL ucznia'
              label='PESEL ucznia'
              name='pupilPesel'
              icon='id card outline'
              iconPosition='left'
            />
            <Form.Input
              className='input'
              icon='user'
              iconPosition='left'
              label='Imię ucznia'
              name='pupilFirstName'
              placeholder='Podaj imię ucznia'
              value={body.isSelf === 'true'  ? user.firstName : null}
            />
            <Form.Input
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko ucznia'
              name='pupilLastName'
              placeholder='Podaj nazwisko ucznia'
            />
            <Form.Input
              icon='at'
              iconPosition='left'
              className='input'
              label='Email ucznia'
              type='email'
              name='pupilEmail'
              placeholder='Podaj adres email ucznia'
            />

            <Form.Input
              className='input'
              label='Numer telefonu ucznia'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu ucznia'
              type='phone'
              name='phone'
            />
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
