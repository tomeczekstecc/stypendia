import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Form, Grid, Header, Label } from 'semantic-ui-react';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import { optionsTotalGrades, optionsGrades, optionsYesNo } from '../../parts';

const SubA_V_VI = () => {
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
  } = submitContext;
  const [aver, setAver] = useState(0);

  const updateAver = async () => {
    await setAver(
      Math.round(
        ((+curDocument?.priMathGrade +
          +curDocument?.priLangGrade +
          +curDocument?.priOtherSubjGrade) /
          3) *
          100
      ) / 100 || 0
    );
  };

  const handleOnChange = async (e) => {
    if (submitMode === 'watch') return;

    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        [e.target.name ||
        e.nativeEvent.path[2].dataset.name ||
        e.nativeEvent.path[3].dataset.name]:
          e.target.value || e.target.innerText,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        [e.target.name ||
        e.nativeEvent.path[2].dataset.name ||
        e.nativeEvent.path[3].dataset.name]:
          e.target.value || e.target.innerText,
      });
    }
  };

  const [curDocument, setCurDocument] = useState(null);

  useEffect(() => {
    resetTimeLeft();
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }

    if (curDocument) {
      curDocument.priTotalAver =
        Math.round(
          ((+curDocument?.priMathGrade +
            +curDocument?.priLangGrade +
            +curDocument?.priOtherSubjGrade) /
            3) *
            100
        ) / 100 || 0;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submitMode,
    submitToWatch,
    newSubmit,
    curSubmit,
    curDocument?.priMathGrade,
    curDocument?.priLangGrade,
    curDocument?.priOtherSubjGrade,
  ]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
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
                iconPosition='left'
                placeholder='MAtematyka'
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
                iconPosition='left'
                placeholder='Wpisz język obcy'
                value={curDocument?.priLang}
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
                  basic
                  color='red'
                  pointing='above'
                  className='small-text'
                >
                  {submitErrors?.priLangGrade}
                </Label>
              )}
              <Form.Input
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
                iconPosition='left'
                placeholder='Wpisz inny przedmiot'
                value={curDocument?.priOtherSubj}
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
                  {curDocument?.priTotalAver || '0.00'}
                </Label>
              </Label>
              {submitErrors?.priTotalAver && (
                <Label
                  basic
                  color='red'
                  pointing='above'
                  className='calculatePriAver'
                >
                  {submitErrors?.priTotalAver}
                </Label>
              )}
              <div className='dropdown-wrapper'>
                <Header className='select-header' as='h5'>
                  Średnia wszystkich ocen
                </Header>
                <Dropdown
                  fluid
                  selection
                  floating
                  className='dropdown'
                  data-name='allTotalAver'
                  onChange={(e) => handleOnChange(e)}
                  value={curDocument?.allTotalAver || 'default'}
                  options={optionsTotalGrades}
                />
                {submitErrors?.allTotalAver && (
                  <Label basic color='red' pointing='above' className='select'>
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
              <Header className='select-header' as='h4'>
                Uczeń/uczennica w roku szkolnym 2019/2020 uzyskał tytułu
                laureata lub finalisty konkursu o zasięgu co najmniej
                wojewódzkim lub olimpiady/turnieju co najmniej II stopnia
              </Header>
              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className='dropdown'
                data-name='isFinalist'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isFinalist || 'default'}
              />
              {submitErrors?.isFinalist && (
                <Label basic color='red' pointing='above' className='select'>
                  {submitErrors?.isFinalist}
                </Label>
              )}
            </div>
            <div className='dropdown-wrapper'>
              <Header className='select-header' as='h4'>
                Uczeń/uczennica posiada w roku szkolnym 2019/2020 zezwolenie na
                uczestnictwo, ze względu na szczególne uzdolnienia w
                indywidualnym programie nauczania lub toku nauki
              </Header>
              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className='dropdown'
                data-name='isAllowed'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isAllowed || 'default'}
              />
              {submitErrors?.isAllowed && (
                <Label basic color='red' pointing='above' className='select'>
                  {submitErrors?.isAllowed}
                </Label>
              )}
            </div>
            <div className='dropdown-wrapper'>
              <Header className='select-header' as='h4'>
                Uczeń/uczennica posiada aktualne na dzień składania wniosku
                orzeczenie o niepełnosprawności lub orzeczenie o stopniu
                niepełnosprawności lub orzeczenie o potrzebie kształcenia
                specjalnego
              </Header>
              <Dropdown
                options={optionsYesNo}
                fluid
                selection
                floating
                className='dropdown'
                data-name='isHandicap'
                onChange={(e) => handleOnChange(e)}
                value={curDocument?.isHandicap || 'default'}
              />
              {submitErrors?.isHandicap && (
                <Label basic color='red' pointing='above' className='select'>
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
