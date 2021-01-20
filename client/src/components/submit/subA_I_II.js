import React, { useContext} from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import SubALayout from '../subALayout';

import AuthContext from '../../context/auth/authContext';
import SubmitContext from '../../context/submit/submitContext';


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
  { key: 'u', text: 'Pełnoletni uczeń', value: 1 },
];

const SubA_I_II = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    updateNewSubmit,
    submitMode,
    curSubmit,
    updateCurSubmit,
    submitToWatch,
  } = submitContext;

  const handleOnChange = async (e) => {
    e.preventDefault();

    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        [e.target.name]: e.target.value,

      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        [e.target.name]: e.target.value,


      });
    }

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
              value={
                submitMode === 'edit'
                  ? curSubmit?.phone
                  : submitMode === 'new'
                  ? newSubmit?.phone
                  : submitToWatch?.phone
              }
            />
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              className='input'
              icon='box'
              iconPosition='left'
              label='Adres skrzynki ePuap (opcjonalnie)'
              placeholder='Podaj adres ePuap (opcjonalnie)'
              name='epuapAdr'
              value={
                submitMode === 'edit'
                  ? curSubmit?.epuapAdr
                  : submitMode === 'new'
                  ? newSubmit?.epuapAdr
                  : submitToWatch?.epuapAdr
              }
            />

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
              value={
                submitMode === 'edit'
                  ? curSubmit?.pupilPesel
                  : submitMode === 'new'
                  ? newSubmit?.pupilPesel
                  : submitToWatch?.pupilPesel
              }
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
                newSubmit.isSelf === '1'
                  ? user.firstName
                  : submitMode === 'edit'
                  ? curSubmit?.pupilFirstName
                  : submitMode === 'new'
                  ? newSubmit?.pupilFirstName
                  : submitToWatch?.pupilFirstName
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
                newSubmit.isSelf === '1'
                  ? user.lastName
                  : submitMode === 'edit'
                  ? curSubmit?.pupilLastName
                  : submitMode === 'new'
                  ? newSubmit?.pupilLastName
                  : submitToWatch?.pupilLastName
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
                newSubmit.isSelf === '1'
                  ? user.email
                  : submitMode === 'edit'
                  ? curSubmit?.pupilEmail
                  : submitMode === 'new'
                  ? newSubmit?.pupilEmail
                  : submitToWatch?.pupilEmail
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
              value={
                submitMode === 'edit'
                  ? curSubmit?.pupilPhone
                  : submitMode === 'new'
                  ? newSubmit?.pupilPhone
                  : submitToWatch?.pupilPhone
              }
            />
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
