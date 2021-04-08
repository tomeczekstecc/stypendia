import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Form, Grid, Header, Label } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import { optionsTotalGrades, optionsGrades, optionsYesNo } from '../../parts';
import Title from '../Title';
import { clearValidation, handleSpecialDelete } from '../../utils';

const SubA_V_VI = () => {
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

  const handleOnChange = async (e) => {
    clearValidation(e, submitErrors);

    if (submitMode === 'watch') return;

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

  const [curDocument, setCurDocument] = useState(null);

  useEffect(() => {
    resetTimeLeft();

    if (curDocument?.priTotalAver !== '5') {
      if (submitErrors) submitErrors.priTotalAver = null;
    }
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }

    if (curDocument) {
      curDocument.priTotalAver = (
        Math.round(
          ((+curDocument?.priMathGrade +
            +curDocument?.priLangGrade +
            +curDocument?.priOtherSubjGrade) /
            3) *
            100
        ) / 100 || 0
      ).toString();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submitMode,
    submitErrors,
    submitToWatch,
    newSubmit,
    curSubmit,
    curDocument?.priMathGrade,
    curDocument?.priLangGrade,
    curDocument?.priOtherSubjGrade,
  ]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Title content='Kryteria oceny - podstawowe i dodatkowe' />
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          V. PODSTAWOWE KRYTERIA:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <div className='adress-wrapper'>
              <Header as='h4'>
                Średnia ocen z trzech wybranych przedmiotów kierunkowych
              </Header>

              <Form.Input
                aria-label='ocena_matematyka'
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                label='Ocena z matematyki'
                required
                className={`${submitMode === 'watch' ? 'disabled-item' : ''}`}
                disabled={submitMode === 'watch'}
                action={
                  <Dropdown
                    button
                    data-name='priMathGrade'
                    className='priMathGrade'
                    basic
                    options={optionsGrades}
                    value={curDocument?.priMathGrade || 'default'}
                    onChange={(e) => handleOnChange(e)}
                  />
                }
                icon='calculator'
                name='priMath'
                data-name='priMath'
                iconPosition='left'
                placeholder='Matematyka'
                value='Matematyka'
                onChange={(e) => handleOnChange(e)}
              />

              {submitErrors?.priMathGrade && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priMathGrade}
                </Label>
              )}

              <Form.Input
                aria-label='ocena_język'
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                label='Język nowożytny i ocena'
                required
                className={`${submitMode === 'watch' ? 'disabled-item' : ''}`}
                disabled={submitMode === 'watch'}
                action={
                  <Dropdown
                    button
                    data-name='priLangGrade'
                    className='priLangGrade'
                    basic
                    options={optionsGrades}
                    value={curDocument?.priLangGrade || 'default'}
                    onChange={(e) => handleOnChange(e)}
                  />
                }
                icon='language'
                name='priLang'
                data-name='priLang'
                iconPosition='left'
                placeholder='Nazwa (2 do 254 znaków)'
                defaultValue={curDocument?.priLang}
                onChange={(e) => handleOnChange(e)}
              />

              {submitErrors?.priLang && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priLang}
                </Label>
              )}
              {!submitErrors?.priLang && submitErrors?.priLangGrade && (
                <Label
                  required
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priLangGrade}
                </Label>
              )}

              <Form.Input
                aria-label='inny przemiot'
                onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
                label='Inny przedmiot i ocena'
                required
                className={`${submitMode === 'watch' ? 'disabled-item' : ''}`}
                disabled={submitMode === 'watch'}
                action={
                  <Dropdown
                    button
                    data-name='priOtherSubjGrade'
                    className='priOtherSubjGrade'
                    basic
                    options={optionsGrades}
                    value={curDocument?.priOtherSubjGrade || 'default'}
                    onChange={(e) => handleOnChange(e)}
                  />
                }
                icon='calendar check'
                name='priOtherSubj'
                data-name='priOtherSubj'
                iconPosition='left'
                placeholder='Nazwa (2 do 254 znaków)'
                defaultValue={curDocument?.priOtherSubj}
                onChange={(e) => handleOnChange(e)}
              />

              {submitErrors?.priOtherSubj && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priOtherSubj}
                </Label>
              )}
              {!submitErrors?.priOtherSubj && submitErrors?.priOtherSubjGrade && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priOtherSubjGrade}
                </Label>
              )}

              <Label size='large' className='aver-label'>
                Średnia ocen przedmiotów kierunkowych :{' '}
                <Label color='grey' size='large'>
                  {+curDocument?.priTotalAver || '0.00'}
                </Label>
              </Label>
              {curDocument?.priTotalAver === '5' && submitErrors?.priTotalAver && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector upper2'
                >
                  {submitErrors?.priTotalAver}
                </Label>
              )}
              <div className='dropdown-wrapper'>
                <div
                  className={`${
                    submitMode === 'watch'
                      ? 'dropdown disabled-item'
                      : 'dropdown'
                  }`}
                >
                  <label>
                    Średnia wszystkich ocen <span className='star'>*</span>
                  </label>
                </div>
                <Dropdown
                  className={`${
                    submitMode === 'watch'
                      ? 'disabled-item dropdown'
                      : 'dropdown'
                  }`}
                  disabled={submitMode === 'watch'}
                  fluid
                  selection
                  floating
                  data-name='allTotalAver'
                  onChange={(e) => handleOnChange(e)}
                  value={curDocument?.allTotalAver || 'default'}
                  options={optionsTotalGrades}
                />
                {submitErrors?.allTotalAver && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text text-selector'
                  >
                    {submitErrors?.allTotalAver}
                  </Label>
                )}
              </div>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Header className='sub-header' floated='left' as='h4'>
          VI. DODATKOWE KRYTERIA:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <div className='dropdown-wrapper'>
              <Header
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item select-header '
                    : 'select-header'
                }`}
                as='h4'
              >
                Uczeń/uczennica w roku szkolnym 2019/2020 uzyskał/a tytułu
                laureatki/ta lub finalistki/ty konkursu o zasięgu co najmniej
                wojewódzkim lub olimpiady/turnieju co najmniej II stopnia
                <span className='star'> *</span>
              </Header>

              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item dropdown '
                    : 'dropdown'
                }`}
                disabled={submitMode === 'watch'}
                data-name='isFinalist'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isFinalist || 'default'}
              />
              {submitErrors?.isFinalist && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector'
                >
                  {submitErrors?.isFinalist}
                </Label>
              )}
            </div>
            <div className='dropdown-wrapper'>
              <Header
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item select-header '
                    : 'select-header'
                }`}
                as='h4'
              >
                Uczeń/uczennica posiada w roku szkolnym 2019/2020 zezwolenie na
                uczestnictwo, ze względu na szczególne uzdolnienia w
                indywidualnym programie nauczania lub toku nauki
                <span className='star'> *</span>
              </Header>
              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item dropdown '
                    : 'dropdown'
                }`}
                disabled={submitMode === 'watch'}
                data-name='isAllowed'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isAllowed || 'default'}
              />
              {submitErrors?.isAllowed && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector'
                >
                  {submitErrors?.isAllowed}
                </Label>
              )}
            </div>
            <div className='dropdown-wrapper'>
              <Header
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item select-header'
                    : 'select-header'
                }`}
                as='h4'
              >
                Uczeń/uczennica posiada aktualne na dzień składania wniosku
                orzeczenie o niepełnosprawności lub orzeczenie o stopniu
                niepełnosprawności lub orzeczenie o potrzebie kształcenia
                specjalnego <span className='star'> *</span>
              </Header>
              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className={`${
                  submitMode === 'watch'
                    ? 'disabled-item dropdown '
                    : 'dropdown'
                }`}
                disabled={submitMode === 'watch'}
                data-name='isHandicap'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isHandicap || 'default'}
              />
              {submitErrors?.isHandicap && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='small-text text-selector'
                >
                  {submitErrors?.isHandicap}
                </Label>
              )}
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_V_VI;
