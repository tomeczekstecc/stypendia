import React, { useContext, useEffect, useState, useRef } from 'react';
import { Dropdown, Form, Grid, Header, Label } from 'semantic-ui-react';
import SubALayout from '../subALayout';
import { useHistory } from 'react-router-dom';

import { AuthContext, SubmitContext } from '../../context';
import { optionsAttachment } from '../../parts/options';
import Title from '../Title';
import { clearValidation, handleSpecialDelete } from '../../utils';

const SubA_I_II = () => {
  const history = useHistory();
  const statusRef = useRef();
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
    clearValidation(e, submitErrors);

    if (submitErrors && submitErrors[e.target.offsetParent.dataset.name])
      submitErrors[e.target.offsetParent.dataset.name] = null;

    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        tempUuid,
        [e.target.dataset.name ||
        e.target.offsetParent.dataset.name ||
        e.target.parentElement.name ||
        e.target.parentElement.dataset.name ||
        e.target.parentElement.parentElement.dataset.name ||
        e.target.parentElement.parentElement.parentElement.dataset.name ||
        e.target.parentElement.parentElement.parentElement.parentElement.dataset
          .name]: e.target.innerText || e.target.value,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        tempUuid,
        [e.target.dataset.name ||
        e.target.offsetParent.dataset.name ||
        e.target.parentElement.name ||
        e.target.parentElement.dataset.name ||
        e.target.parentElement.parentElement.dataset.name ||
        e.target.parentElement.parentElement.parentElement.dataset.name ||
        e.target.parentElement.parentElement.parentElement.parentElement.dataset
          .name]: e.target.innerText || e.target.value,
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
      <Title content='Informacje dotyczące ucznia/uczennicy' />
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          I. DANE OSOBOWE WNIOSKODAWCY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                label='Imię wnioskodawcy'
                name='firstName'
                data-name='firstName'
                icon='user'
                required
                iconPosition='left'
                value={user?.firstName || ''} //
              />
            </label>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                icon='user'
                iconPosition='left'
                required
                label='Nazwisko wnioskodawcy'
                name='lastName'
                data-name='lastName'
                value={user?.lastName || ''}
              />
            </label>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
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
                data-name='phone'
                value={user?.email || ''}
              />
            </label>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                label='Numer telefonu wnioskodawcy'
                icon='phone'
                iconPosition='left'
                placeholder='Podaj numer telefonu (9 do 15 znaków)'
                name='phone'
                autoFocus='autofocus'
                data-name='phone'
                onChange={(e) => handleOnChange(e)}
                defaultValue={curDocument?.phone || ''}
              />
            </label>
            {submitErrors?.phone && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.phone}
              </Label>
            )}
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
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
                data-name='epuapAdr'
                defaultValue={curDocument?.epuapAdr || ''}
              />
            </label>

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
              data-name='isSelf'
              name='isSelf'
              ref={statusRef}
              fluid
              selection
              floating
              className={`${
                submitMode === 'watch' ? 'disabled-item dropdown ' : 'dropdown'
              }`}
              disabled={submitMode === 'watch'}
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
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                onChange={(e) => handleOnChange(e)}
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                required
                placeholder='Podaj PESEL (11 znaków)'
                label='PESEL ucznia'
                name='pupilPesel'
                data-name='pupilPesel'
                icon='id card outline'
                iconPosition='left'
                defaultValue={curDocument?.pupilPesel || ''}
              />
            </label>
            {submitErrors?.pupilPesel && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilPesel}
              </Label>
            )}
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
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
                data-name='pupilFirstName'
                placeholder='Podaj imię ucznia (2 do 254 znaków)'
                defaultValue={
                  (newSubmit.isSelf === 'Pełnoletni uczeń'
                    ? user.firstName
                    : curDocument.pupilFirstName) || ''
                }
              />
            </label>
            {submitErrors?.pupilFirstName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilFirstName}
              </Label>
            )}
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
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
                data-name='pupilLastName'
                placeholder='Podaj nazwisko ucznia (2 do 254 znaków)'
                defaultValue={
                  (newSubmit.isSelf === 'Pełnoletni uczeń'
                    ? user.lastName
                    : curDocument.pupilLastName) || ''
                }
              />
            </label>
            {submitErrors?.pupilLastName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilLastName}
              </Label>
            )}
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
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
                data-name='pupilEmail'
                placeholder='Podaj adres email ucznia'
                defaultValue={
                  (newSubmit.isSelf === 'Pełnoletni uczeń'
                    ? user.email
                    : curDocument.pupilEmail) || ''
                }
              />
            </label>
            {submitErrors?.pupilEmail && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.pupilEmail}
              </Label>
            )}
            <label>

            <Form.Input
              onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
              onChange={(e) => handleOnChange(e)}
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              label='Numer telefonu ucznia'
              icon='phone'
              iconPosition='left'
              placeholder='Podaj numer telefonu (9 do 15 znaków)'
              type='phone'
              name='pupilPhone'
              data-name='pupilPhone'
              defaultValue={curDocument?.pupilPhone || ''}
            /></label>
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
