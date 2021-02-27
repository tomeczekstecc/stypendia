import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Form, Grid, Header, Label } from 'semantic-ui-react';
import SubALayout from '../subALayout';
import { useHistory } from 'react-router-dom';

import { AuthContext, SubmitContext } from '../../context';
import { optionsAttachment } from '../../parts/options';

const SubA_I_II = () => {
  const history = useHistory();
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
    submitErrors,
    tempUuid,
  } = submitContext;
  submitMode === '' && history.push('/');
  const [curDocument, setCurDocument] = useState({});

  const handleOnChange = async (e) => {
    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        tempUuid,
        [e.target.name ||
        e.nativeEvent.path[1].dataset.name ||
        e.nativeEvent.path[2].dataset.name ||
        e.nativeEvent.path[3].dataset.name ||
        e.target.dataset.name]: e.target.value || e.target.innerText,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        tempUuid,
        [e.target.name ||
        e.nativeEvent.path[1].dataset.name ||
        e.nativeEvent.path[2].dataset.name ||
        e.nativeEvent.path[3].dataset.name ||
        e.target.dataset.name]: e.target.value || e.target.innerText,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          I. DANE OSOBOWE WNIOSKODAWCY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Imię wnioskodawcy'
              name='firstName'
              icon='user'
              required
              iconPosition='left'
              value={user?.firstName || ''} //
            />
            <Form.Input
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              icon='user'
              iconPosition='left'
              required
              label='Nazwisko wnioskodawcy'
              name='lastName'
              value={user?.lastName || ''}
            />

            <Form.Input
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Email wnioskodawcy'
              required
              icon='at'
              iconPosition='left'
              placeholder='Podaj email wnioskodawcy'
              name='phone'
              value={user?.email || ''}
            />
            <Form.Input
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Numer telefonu wnioskodawcy'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu wnioskodawcy'
              name='phone'
              onChange={(e) => handleOnChange(e)}
              value={curDocument?.phone || ''}
            />
            {submitErrors?.phone && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.phone}
              </Label>
            )}

            <Form.Input
              onChange={(e) => handleOnChange(e)}
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              icon='box'
              iconPosition='left'
              label='Adres skrzynki ePuap'
              placeholder='Podaj adres ePuap'
              name='epuapAdr'
              value={curDocument?.epuapAdr || ''}
            />
            <div
              className={`${
                submitMode === 'watch' ? 'disabled-item labeler ' : 'labeler'
              }`}
            >
              <label>
                Status wnioskodawcy <span className='star'>*</span>
              </label>
            </div>
            <Dropdown
              fluid
              selection
              floating
              className={`${
                submitMode === 'watch' ? 'disabled-item dropdown ' : 'dropdown'
              }`}
              disabled={submitMode === 'watch'}
              data-name='isSelf'
              onChange={(e) => handleOnChange(e)}
              value={curDocument?.isSelf || 'default'}
              options={optionsAttachment}
            />
            {submitErrors?.isSelf && (
              <Label
                basic
                color='red'
                pointing='above'
                className='small-text text-selector'
              >
                {submitErrors?.isSelf}
              </Label>
            )}
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
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              required
              placeholder='Podaj PESEL ucznia'
              label='PESEL ucznia'
              name='pupilPesel'
              icon='id card outline'
              iconPosition='left'
              value={curDocument?.pupilPesel || ''}
            />
            {submitErrors?.pupilPesel && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilPesel}
              </Label>
            )}
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              required
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              icon='user'
              iconPosition='left'
              label='Imię ucznia'
              name='pupilFirstName'
              placeholder='Podaj imię ucznia'
              value={
                (newSubmit.isSelf === 'Pełnoletni uczeń'
                  ? user.firstName
                  : curDocument.pupilFirstName) || ''
              }
            />
            {submitErrors?.pupilFirstName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilFirstName}
              </Label>
            )}

            <Form.Input
              onChange={(e) => handleOnChange(e)}
              icon='user'
              required
              iconPosition='left'
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Nazwisko ucznia'
              name='pupilLastName'
              placeholder='Podaj nazwisko ucznia'
              value={
                (newSubmit.isSelf === 'Pełnoletni uczeń'
                  ? user.lastName
                  : curDocument.pupilLastName) || ''
              }
            />
            {submitErrors?.pupilLastName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilLastName}
              </Label>
            )}
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              icon='at'
              iconPosition='left'
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Email ucznia'
              type='email'
              name='pupilEmail'
              placeholder='Podaj adres email ucznia'
              value={
                (newSubmit.isSelf === 'Pełnoletni uczeń'
                  ? user.email
                  : curDocument.pupilEmail) || ''
              }
            />
            {submitErrors?.pupilEmail && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilEmail}
              </Label>
            )}
            <Form.Input
              onChange={(e) => handleOnChange(e)}
              c
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Numer telefonu ucznia'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu ucznia'
              type='phone'
              name='pupilPhone'
              value={curDocument?.pupilPhone || ''}
            />
            {submitErrors?.pupilPhone && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilPhone}
              </Label>
            )}
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
