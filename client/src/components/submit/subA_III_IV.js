import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Segment,
} from 'semantic-ui-react';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import { optionsVoyev, optionsSchoolType, optionsProfile } from '../../parts';
import Title from '../Title';
import { clearValidation, handleSpecialDelete } from '../../utils';

const SubA_III_IV = () => {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

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
      <Title content='Informacje dotyczące szkoły i opiekuna' />
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          III. DANE SZKOŁY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                className={`${
                  submitMode === 'watch' ? 'disabled-item input ' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                required
                label='Pełna nazwa szkoły'
                name='schoolName'
                data-name='schoolName'
                icon='building outline'
                placeholder='Podaj pełną nazwę (2 do 254 znaków)'
                iconPosition='left'
                onChange={(e) => handleOnChange(e)}
                defaultValue={curDocument?.schoolName || ''}
              />
            </label>
            {submitErrors?.schoolName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.schoolName}
              </Label>
            )}
            <div className='select-wrapper'>
              <div
                className={`${
                  submitMode === 'watch' ? 'disabled-item labeler ' : 'labeler'
                }`}
              >
                <label>
                  Rodzaj szkoły <span className='star'>*</span>
                </label>
              </div>

              <Dropdown
                fluid
                selection
                floating
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item dropdown '
                    : 'dropdown'
                }`}
                disabled={submitMode === 'watch'}
                data-name='schoolType'
                name='schoolType'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.schoolType || 'default'}
                options={optionsSchoolType}
              />
              {submitErrors?.schoolType && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector'
                >
                  {submitErrors?.schoolType}
                </Label>
              )}
            </div>

            <div className='adress-wrapper'>
              <Header as='h4'>Adres szkoły:</Header>
              <Segment>
                <label>

                <Form.Input
                  onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                  required
                  label='Ulica'
                  className={`${
                    submitMode === 'watch' ? 'input disabled-item' : 'input'
                  }`}
                  disabled={submitMode === 'watch'}
                  icon='road'
                  iconPosition='left'
                  placeholder='Podaj ulicę  (2 do 254 znaków)'
                  name='schoolStreetName'
                  data-name='schoolStreetName'
                  defaultValue={curDocument?.schoolStreetName || ''}
                  onChange={(e) => handleOnChange(e)}
                /></label>

                {submitErrors?.schoolStreetName && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text'
                  >
                    {submitErrors?.schoolStreetName}
                  </Label>
                )}
                <label>
                  <Form.Input
                    onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                    required
                    className={`${
                      submitMode === 'watch' ? 'input disabled-item' : 'input'
                    }`}
                    disabled={submitMode === 'watch'}
                    label='Numer domu'
                    icon='building'
                    iconPosition='left'
                    placeholder='Podaj numer domu (1 do 254 znaków)'
                    name='schoolStreetNr'
                    data-name='schoolStreetNr'
                    defaultValue={curDocument?.schoolStreetNr || ''}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                {submitErrors?.schoolStreetNr && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text'
                  >
                    {submitErrors?.schoolStreetNr}
                  </Label>
                )}
                <label>
                  <Form.Input
                    onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                    label='Kod pocztowy'
                    required
                    className={`${
                      submitMode === 'watch' ? 'input disabled-item' : 'input'
                    }`}
                    disabled={submitMode === 'watch'}
                    icon='zip'
                    iconPosition='left'
                    placeholder='Podaj kod pocztowy w formacie XX-XXX'
                    name='schoolZip'
                    data-name='schoolZip'
                    defaultValue={curDocument?.schoolZip || ''}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                {submitErrors?.schoolZip && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text'
                  >
                    {submitErrors?.schoolZip}
                  </Label>
                )}
                <label>
                  <Form.Input
                    onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                    className={`${
                      submitMode === 'watch' ? 'input disabled-item' : 'input'
                    }`}
                    disabled={submitMode === 'watch'}
                    icon='map marker alternate'
                    iconPosition='left'
                    label='Miejscowość'
                    required
                    placeholder='Podaj miejscowość (2 do 254 znaków)'
                    name='schoolTown'
                    data-name='schoolTown'
                    defaultValue={curDocument?.schoolTown || ''}
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                {submitErrors?.schoolTown && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text'
                  >
                    {submitErrors?.schoolTown}
                  </Label>
                )}
                <div
                  className={`${
                    submitMode === 'watch'
                      ? 'disabled-item labeler '
                      : 'labeler'
                  }`}
                >
                  <label>
                    Województwo <span className='star'>*</span>
                  </label>
                </div>
                <Dropdown
                  fluid
                  selection
                  floating
                  className={`${
                    submitMode === 'watch'
                      ? 'disabled-item dropdown '
                      : 'dropdown'
                  }`}
                  disabled={submitMode === 'watch'}
                  data-name='schoolVoyev'
                  name='schoolVoyev'
                  onChange={(e) => handleOnChange(e)}
                  value={curDocument?.schoolVoyev || 'default'}
                  options={optionsVoyev}
                />
                {submitErrors?.schoolVoyev && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text text-selector'
                  >
                    {submitErrors?.schoolVoyev}
                  </Label>
                )}
              </Segment>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Header className='sub-header' floated='left' as='h4'>
          IV. DANE OPIEKUNA DYDAKTYCZNEGO:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                required
                icon='user'
                iconPosition='left'
                label='Imię doradcy'
                name='counselorFirstName'
                data-name='counselorFirstName'
                placeholder='Podaj imię (2 do 254 znaków)'
                defaultValue={curDocument?.counselorFirstName || ''}
                onChange={(e) => handleOnChange(e)}
              />
            </label>
            {submitErrors?.counselorFirstName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.counselorFirstName}
              </Label>
            )}
            <label>
              <Form.Input
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                icon='user'
                required
                iconPosition='left'
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                label='Nazwisko doradcy'
                name='counselorLastName'
                data-name='counselorLastName'
                placeholder='Podaj nazwisko (2 do 254 znaków)'
                defaultValue={curDocument?.counselorLastName || ''}
                onChange={(e) => handleOnChange(e)}
              />
            </label>

            {submitErrors?.counselorLastName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.counselorLastName}
              </Label>
            )}
            <div className='select-wrapper'>
              <div
                className={`${
                  submitMode === 'watch' ? 'disabled-item labeler ' : 'labeler'
                }`}
              >
                <label>
                  Profil doradcy <span className='star'>*</span>
                </label>
              </div>
              <Dropdown
                fluid
                required
                selection
                floating
                className={`${
                  submitMode === 'watch' ? 'input disabled-item' : 'input'
                }`}
                disabled={submitMode === 'watch'}
                name='counselorProfile'
                data-name='counselorProfile'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.counselorProfile || 'default'}
                options={optionsProfile}
              />
              {submitErrors?.counselorProfile && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector upper'
                >
                  {submitErrors?.counselorProfile}
                </Label>
              )}
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_III_IV;
