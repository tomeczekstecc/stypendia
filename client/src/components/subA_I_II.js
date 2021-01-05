import React, { useContext, useState } from 'react';
import { Form, Grid, Header, Label } from 'semantic-ui-react';
import SubALayout from './subALayout';

import AuthContext from '../context/auth/authContext';
import SubmitContext from '../context/submit/submitContext';

const options = [
  {
    key: 's',
    text: 'Wybierz status wnioskodawcy',
    value: 'default',
    disabled: true,
  },
  {
    key: 'p',
    text: 'Rodzic/Opiekun prawny',
    value: 0,
  },
  { key: 'u', text: 'Pełnoletni uczeń', value: 1},
];

const SubA_I_II = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const submitContext = useContext(SubmitContext);
  const { currentSubmit, updateCurrentSubmit } = submitContext;

  const handleOnChange = async (e) => {
    e.preventDefault();
    await updateCurrentSubmit({
      ...currentSubmit,
      // firstName: user.firstName, // chyba lepiej na backendzie + pupif jeśli isSelf
      // lastName: user.lastName,
      // email: user.email,
      [e.target.name]: e.target.value,
    });
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
              value={user?.firstName} // usynąć znak zapytania
            />
            <Form.Input
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko wnioskodawcy'
              name='lastName'
              value={user?.lastName}
            />

            <Form.Input
              className='input'
              label='Email wnioskodawcy'
              icon='at'
              iconPosition='left'
              placeholder='Podaj email wnioskodawcy'
              name='phone'
              value={user?.email}
            />
            <Form.Input
              className='input'
              label='Numer telefonu wnioskodawcy'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu wnioskodawcy'
              name='phone'
              onChange={(e) => handleOnChange(e)}
              value={currentSubmit.phone}
            />
            <Form.Input
              onChange={(e) => handleOnChange(e)}
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
              <select
                name='isSelf'
                defaultValue='default'
                onChange={(e) => handleOnChange(e)}
              >
                {options.map((o) => (
                  <option disabled={o.disabled} key={o.key} value={o.value}>
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
              onChange={(e) => handleOnChange(e)}
              className='input'
              placeholder='Podaj PESEL ucznia'
              label='PESEL ucznia'
              name='pupilPesel'
              icon='id card outline'
              iconPosition='left'
              value={currentSubmit.pupilPesel}
            />
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              className='input'
              icon='user'
              iconPosition='left'
              label='Imię ucznia'
              name='pupilFirstName'
              placeholder='Podaj imię ucznia'
              value={
                currentSubmit.isSelf === '1'
                  ? user.firstName
                  : currentSubmit.pupilFirstName
              }
            />
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko ucznia'
              name='pupilLastName'
              placeholder='Podaj nazwisko ucznia'
              value={
                currentSubmit.isSelf === '1'
                  ? user.lastName
                  : currentSubmit.pupilLastName
              }
            />
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              icon='at'
              iconPosition='left'
              className='input'
              label='Email ucznia'
              type='email'
              name='pupilEmail'
              placeholder='Podaj adres email ucznia'
              value={
                currentSubmit.isSelf === '1'
                  ? user.email
                  : currentSubmit.pupilEmail
              }
            />

            <Form.Input
              onChange={(e) => handleOnChange(e)}
              className='input'
              label='Numer telefonu ucznia'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu ucznia'
              type='phone'
              name='pupilPhone'
              value={currentSubmit.pupilPhone}
            />
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
