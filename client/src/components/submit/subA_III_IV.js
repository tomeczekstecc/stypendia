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
          III. DANE SZKOŁY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className={`${
                submitMode === 'watch' ? 'disabled-item input ' : 'input'
              }`}
              disabled={submitMode === 'watch'}
              required
              label='Pełna nazwa szkoły'
              name='schoolName'
              icon='building outline'
              placeholder='Podaj pełną nazwę szkoły'
              iconPosition='left'
              onChange={(e) => handleOnChange(e)}
              value={curDocument?.schoolName || ''}
            />

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
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.schoolType || 'default'}
                options={optionsSchoolType}
              />
              {submitErrors?.schoolType && (
                <Label basic color='red' pointing='above' className='select'>
                  {submitErrors?.schoolType}
                </Label>
              )}
            </div>

            <div className='adress-wrapper'>
              <Header as='h4'>Adres szkoły:</Header>
              <Segment>
                <Form.Input
                  required
                  label='Ulica'
                  className={`${
                    submitMode === 'watch' ? 'input disabled-item' : 'input'
                  }`}
                  disabled={submitMode === 'watch'}
                  icon='user'
                  iconPosition='left'
                  placeholder='Podaj ulicę'
                  name='schoolStreetName'
                  value={curDocument?.schoolStreetName || ''}
                  onChange={(e) => handleOnChange(e)}
                />

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

                <Form.Input
                  required
                  className={`${
                    submitMode === 'watch' ? 'input disabled-item' : 'input'
                  }`}
                  disabled={submitMode === 'watch'}
                  label='Numer domu'
                  icon='phone'
                  iconPosition='left'
                  placeholder='Podaj numer domu'
                  name='schoolStreetNr'
                  value={curDocument?.schoolStreetNr || ''}
                  onChange={(e) => handleOnChange(e)}
                />
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
                <Form.Input
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
                  value={curDocument?.schoolZip || ''}
                  onChange={(e) => handleOnChange(e)}
                />
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
                <Form.Input
                  className={`${
                    submitMode === 'watch' ? 'input disabled-item' : 'input'
                  }`}
                  disabled={submitMode === 'watch'}
                  icon='zip'
                  iconPosition='left'
                  label='Miejscowość'
                  required
                  placeholder='Podaj miejscowość'
                  name='schoolTown'
                  value={curDocument?.schoolTown || ''}
                  onChange={(e) => handleOnChange(e)}
                />
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
                  onChange={(e) => handleOnChange(e)}
                  value={curDocument?.schoolVoyev || 'default'}
                  options={optionsVoyev}
                />
                {submitErrors?.schoolVoyev && (
                  <Label basic color='red' pointing='above' className='select'>
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
            <Form.Input
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              required
              icon='user'
              iconPosition='left'
              label='Imię doradcy'
              name='counselorFirstName'
              placeholder='Podaj imię doradcy'
              value={curDocument?.counselorFirstName || ''}
              onChange={(e) => handleOnChange(e)}
            />
            {submitErrors?.counselorFirstName && (
              <Label basic color='red' pointing='above' className='small-text'>
                {submitErrors?.counselorFirstName}
              </Label>
            )}
            <Form.Input
              icon='user'
              required
              iconPosition='left'
              className={`${
                submitMode === 'watch' ? 'input disabled-item' : 'input'
              }`}
              label='Nazwisko doradcy'
              name='counselorLastName'
              placeholder='Podaj nazwisko doradcy'
              value={curDocument?.counselorLastName || ''}
              onChange={(e) => handleOnChange(e)}
            />
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
                data-name='counselorProfile'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.counselorProfile || 'default'}
                options={optionsProfile}
              />
              {submitErrors?.counselorProfile && (
                <Label basic color='red' pointing='above' className='select'>
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
