import React, { useContext, useEffect} from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import SubALayout from '../subALayout';
import {SubmitContext,AuthContext } from '../../context';
import {
  optionsVoyev,
  optionsSchoolType,
  optionsProfile,
} from '../../parts';

const SubA_III_IV = () => {
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
  } = submitContext;

  const handleOnChange = async (e) => {
    e.preventDefault();

    if (submitMode === 'edit') {
      console.log('edit');
      await updateCurSubmit({
        ...curSubmit,
        [e.target.name]: e.target.value,
      });
    } else if (submitMode === 'new') {
      console.log('new');
      await updateNewSubmit({
        ...newSubmit,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    resetTimeLeft();
  }, []);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          III. DANE SZKOŁY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              label='Pełna nazwa szkoły'
              name='schoolName'
              icon='building outline'
              placeholder='Podaj pełną nazwę szkoły'
              iconPosition='left'
              onChange={(e) => handleOnChange(e)}
              value={
                (submitMode === 'edit'
                  ? curSubmit?.schoolName
                  : submitMode === 'new'
                  ? newSubmit?.schoolName
                  : submitToWatch?.schoolName) || ''
              }
            />

            <div className='select-wrapper'>
              <Header className='select-header' as='h5'>
                Profil doradcy
              </Header>
              <select
                name='schoolType'
                onChange={(e) => handleOnChange(e)}
                value={
                  (submitMode === 'edit'
                    ? curSubmit?.schoolType
                    : submitMode === 'new'
                    ? newSubmit?.schoolType
                    : submitToWatch?.schoolType) || 'default'
                }


              >
                {optionsSchoolType.map((o) => (
                  <option disabled={o.disabled} key={o.key} value={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>

            <div className='adress-wrapper'>
              <Header as='h4'>Adres szkoły</Header>
              <Segment>
                <Form.Input
                  className='input'
                  icon='user'
                  iconPosition='left'
                  placeholder='Podaj ulicę'
                  name='schoolStreetName'
                  value={
                    (submitMode === 'edit'
                      ? curSubmit?.schoolStreetName
                      : submitMode === 'new'
                      ? newSubmit?.schoolStreetName
                      : submitToWatch?.schoolStreetName) || ''
                  }
                  onChange={(e) => handleOnChange(e)}
                />

                <Form.Input
                  className='input'
                  // label='Adres szkoły (numer domu)'
                  icon='phone'
                  iconPosition='left'
                  placeholder='Podaj numer domu'
                  name='schoolStreetNr'
                  value={
                    (submitMode === 'edit'
                      ? curSubmit?.schoolStreetNr
                      : submitMode === 'new'
                      ? newSubmit?.schoolStreetNr
                      : submitToWatch?.schoolStreetNr) || ''
                  }
                  onChange={(e) => handleOnChange(e)}
                />
                <Form.Input
                  className='input'
                  icon='zip'
                  iconPosition='left'
                  // label='Adres szkoły (kod pocztowy)'
                  placeholder='Podaj kod pocztowy w formacie XX-XXX'
                  name='schoolZip'
                  value={
                    (submitMode === 'edit'
                      ? curSubmit?.schoolZip
                      : submitMode === 'new'
                      ? newSubmit?.schoolZip
                      : submitToWatch?.schoolZip) || ''
                  }
                  onChange={(e) => handleOnChange(e)}
                />
                <Form.Input
                  className='input'
                  icon='zip'
                  iconPosition='left'
                  // label='Adres szkoły (miejscowość)'
                  placeholder='Podaj miejscowość'
                  name='schoolTown'
                  value={
                    (submitMode === 'edit'
                      ? curSubmit?.schoolTown
                      : submitMode === 'new'
                      ? newSubmit?.schoolTown
                      : submitToWatch?.schoolTown) || ''
                  }
                  onChange={(e) => handleOnChange(e)}
                />
                <div className='select-wrapper'>
                  <select
                    name='schoolVoyev'
                    onChange={(e) => handleOnChange(e)}
                    value={
                      (submitMode === 'edit'
                        ? curSubmit?.schoolVoyev
                        : submitMode === 'new'
                        ? newSubmit?.schoolVoyev
                        : submitToWatch?.schoolVoyev) || 'default'
                    }
                         >
                    {optionsVoyev.map((o) => (
                      <option disabled={o.disabled} key={o.key} value={o.value}>
                        {o.text}
                      </option>
                    ))}
                  </select>
                </div>
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
              className='input'
              icon='user'
              iconPosition='left'
              label='Imię doradcy'
              name='counselorFirstName'
              placeholder='Podaj imię doradcy'
              value={
                (submitMode === 'edit'
                  ? curSubmit?.counselorFirstName
                  : submitMode === 'new'
                  ? newSubmit?.counselorFirstName
                  : submitToWatch?.counselorFirstName) || ''
              }
              onChange={(e) => handleOnChange(e)}
            />
            <Form.Input
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko doradcy'
              name='counselorLastName'
              placeholder='Podaj nazwisko doradcy'
              value={
                (submitMode === 'edit'
                  ? curSubmit?.counselorLastName
                  : submitMode === 'new'
                  ? newSubmit?.counselorLastName
                  : submitToWatch?.counselorLastName) || ''
              }
              onChange={(e) => handleOnChange(e)}
            />

            <div className='select-wrapper'>
              <Header className='select-header' as='h5'>
                Profil doradcy
              </Header>
              <select
                name='counselorProfile'
                onChange={(e) => handleOnChange(e)}
                placeholder='Wybierz profil doradcy'
                value={
                  (submitMode === 'edit'
                    ? curSubmit?.counselorProfile
                    : submitMode === 'new'
                    ? newSubmit?.counselorProfile
                    : submitToWatch?.counselorProfile) || 'default'
                }

              >
                {optionsProfile.map((o) => (
                  <option disabled={o.disabled} key={o.key} value={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_III_IV;
