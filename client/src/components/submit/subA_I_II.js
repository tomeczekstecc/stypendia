import React, { useContext, useEffect, useState } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import SubALayout from '../subALayout';

import { AuthContext, SubmitContext } from '../../context';
import { optionsAttachment } from '../../parts';

const SubA_I_II = () => {
  const authContext = useContext(AuthContext);
  const { user, resetTimeLeft } = authContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    updateNewSubmit,
    submitMode,
    curSubmit,
    updateCurSubmit,
    submitToWatch,
  } = submitContext;

  const [curDocument, setCurDocument] = useState(null);

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
  useEffect(() => {
    resetTimeLeft();
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }
  }, []);

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
              value={
                submitMode === 'edit'
                  ? curSubmit?.phone
                  : submitMode === 'new'
                  ? newSubmit?.phone
                  : submitToWatch?.phone
              }
              onChange={(e) => handleOnChange(e)}
            />
            <Form.Input
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
              onChange={(e) => handleOnChange(e)}
            />

            <div className='select-wrapper'>
              <Header className='select-header' as='h5'>
                Status Wnioskodawcy
              </Header>
              <select
                name='isSelf'
                defaultValue='default'
                value={
                  submitMode === 'edit'
                    ? curSubmit?.isSelf
                    : submitMode === 'new'
                    ? newSubmit?.isSelf
                    : submitToWatch?.isSelf
                }
                onChange={(e) => handleOnChange(e)}
              >
                {optionsAttachment.map((o) => (
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
              onChange={(e) => handleOnChange(e)}
            />
            <Form.Input
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
              onChange={(e) => handleOnChange(e)}
            />
            <Form.Input
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
              onChange={(e) => handleOnChange(e)}
            />
            <Form.Input
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
              onChange={(e) => handleOnChange(e)}
            />

            <Form.Input
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
              onChange={(e) => handleOnChange(e)}
            />
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
