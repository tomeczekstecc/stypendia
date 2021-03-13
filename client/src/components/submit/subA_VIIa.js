import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Accordion,
  Checkbox,
  Container,
  Dropdown,
  Form,
  Header,
  Label,
  Message,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import { accordionsVIIa } from '../../parts/index';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import Title from '../Title';
import { clearValidation } from '../../utils/clearValidation';

const SubA_VIIa = () => {
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

  const handleOnChange = async (e, parent = undefined, name = undefined) => {
    clearValidation(e, submitErrors);

    if (submitMode === 'watch') return;
    if (parent && name) {
      if (curDocument && curDocument[parent] && curDocument[parent] === true) {
        curDocument[name] = '';
      }
    }
    // e.target.offsetParent.dataset.name,
    //               e.target.offsetParent.firstChild.checked

    if (e.target.offsetParent.firstChild.type === 'checkbox') {
      if (e.target.offsetParent.firstChild.checked) {
        curDocument.tab1Results -= 1;
      } else if (!e.target.offsetParent.firstChild.checked) {
        curDocument.tab1Results += 1;
      }

      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
          tempUuid,
          [e.target.offsetParent.dataset.name]: !e.target.offsetParent
            .firstChild.checked,
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
          tempUuid,
          [e.target.offsetParent.dataset.name]: !e.target.offsetParent
            .firstChild.checked,
        });
      }
    } else {
      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
          [e.target.dataset.name ||
          e.target.offsetParent.dataset.name ||
          e.target.parentElement.name ||
          e.target.parentElement.dataset.name ||
          e.target.parentElement.parentElement.dataset.name ||
          e.target.parentElement.parentElement.parentElement.dataset.name ||
          e.target.parentElement.parentElement.parentElement.parentElement
            .dataset.name]: e.target.innerText || e.target.value,
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
          [e.target.dataset.name ||
          e.target.offsetParent.dataset.name ||
          e.target.parentElement.name ||
          e.target.parentElement.dataset.name ||
          e.target.parentElement.parentElement.dataset.name ||
          e.target.parentElement.parentElement.parentElement.dataset.name ||
          e.target.parentElement.parentElement.parentElement.parentElement
            .dataset.name]: e.target.innerText || e.target.value,
        });
      }
    }
  };

  const [options, setOptions] = useState([
    {
      key: 'a',
      text: 'Wybierz przedmiot',
      value: 'default',
      disabled: true,
    },
    {
      key: 'b',
      text: curDocument?.priLang,
      value: curDocument?.priLang,
    },
    {
      key: 'c',
      text: curDocument?.priOtherSubj,
      value: curDocument?.priOtherSubj,
    },
  ]);

  useEffect(() => {
        resetTimeLeft();
        if (curDocument.tab2Results === 3) {
          if (submitErrors) submitErrors.tab2Results = null;
        }
        if (curDocument.tab2Results !== 3) {
          if (submitErrors)
            submitErrors.tab2Results =
              'Liczba wybranych rezultatów w tabeli 2 musi wynosić dokładnie 3';
        }

    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }

    setOptions([
      {
        key: 'a',
        text: 'Wybierz przedmiot',
        value: 'default',
        disabled: true,
      },
      {
        key: 'd',
        text: 'matematyka',
        value: 'matematyka',
      },
      {
        key: 'b',
        text: curDocument?.priLang?.toLowerCase(),
        value: curDocument?.priLang?.toLowerCase(),
      },

      {
        key: 'c',
        text: curDocument?.priOtherSubj?.toLowerCase(),
        value: curDocument?.priOtherSubj?.toLowerCase(),
      },
    ]);
    if (!curDocument.tab1Results) curDocument.tab1Results = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Title content='Ścieżka rozwoju ucznia - tabela 1' />
      <Header className='sub-header' floated='left' as='h4'>
        VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY - Przedmiot
        kierunkowy
      </Header>

      <Container textAlign='left' fluid>
        {' '}
        <Segment className='segment-vii'>
          <Header
            textAlign='left'
            floated='left'
            className={`${
              submitMode === 'watch'
                ? 'disabled-item inline-position header'
                : 'inline-position header'
            }`}
            disabled={submitMode === 'watch'}
            as='h4'
          >
            Przedmiot kierunkowy: <span className='star'> *</span>
          </Header>

          <Dropdown
            disabled={
              submitMode === 'watch' ||
              !curDocument?.priLang ||
              !curDocument?.priOtherSubj
            }
            className='inline-position drop'
            selection
            data-name='tab1Subj'
            value={curDocument?.tab1Subj}
            options={options}
            defaultValue='default'
            onChange={(e) => handleOnChange(e)}
          />
          {(!curDocument?.priLang || !curDocument?.priOtherSubj) && (
            <Label basic color='red' className='label-valid' size='large'>
              Nie wybrano wszytkich przedmiotów w części V.
            </Label>
          )}
        </Segment>
        {submitErrors?.tab1Subj && (
          <Label
            basic
            color='red'
            pointing='above'
            className='small-text key-subj-err'
          >
            {submitErrors?.tab1Subj}
          </Label>
        )}
        <Message className='msg' info size='small' floating>
          <Message.Header>
            Planowane rezultaty - przedmiot kierunkowy. Wybierz maksymalnie 3
            rezultaty. <span className='star'> *</span>
          </Message.Header>
          <p>
            Uczeń/uczennica w czasie trwania projektu jest zobowiązany do
            realizowania wskazanych celów edukacyjnych i planowanych do
            uzyskania rezultatów. z dwóch wybranych przedmiotów wraz z
            kandydatem na opiekuna dydaktycznego Stypendysty/opiekunem
            dydaktycznym. W tej tabeli wybierz dla wybranego przedmiotu
            <strong> trzy planowane</strong> do osiągnięcia rezultaty, które
            uczeń/uczennica zamierza osiągnąć w roku szkolnym 2020/2021.
          </p>{' '}
          <Label size='large' basic color='teal'>
            Liczba wybranych rezultatów:
            {curDocument?.tab1Results} (brakuje: {3 - curDocument?.tab1Results})
          </Label>
        </Message>
        {submitErrors?.tab1Results && (
          <Label
            basic
            color='red'
            pointing='below'
            className='small-text accordion-results'
          >
            {submitErrors?.tab1Results}
          </Label>
        )}
        <Accordion
          className={submitMode === 'watch' ? 'acc-dimmed' : ''}
          fluid
          styled
        >
          {accordionsVIIa.map((acc) => (
            <div key={acc.id}>
              <Accordion.Title>
                <Checkbox
                  checked={
                    curDocument &&
                    curDocument[acc.checkeboxName] &&
                    curDocument[acc.checkeboxName] === true
                  }
                  name={acc.checkeboxName}
                  data-name={acc.checkeboxName}
                  data-type='checkbox'
                  onChange={(e) =>
                    handleOnChange(e, acc.checkeboxName, acc.areaName)
                  }
                  disabled={
                    curDocument.tab1Results >= 3 &&
                    curDocument[acc.checkeboxName] !== true
                  }
                  toggle
                  label={acc.label}
                />
              </Accordion.Title>

              {acc.areaName && (
                <Accordion.Content
                  active={
                    curDocument &&
                    curDocument[acc.checkeboxName] &&
                    curDocument[acc.checkeboxName] === true
                  }
                >
                  <Form className='form-vii'>
                    <TextArea
                      value={
                        (curDocument &&
                          curDocument[acc.areaName] &&
                          curDocument[acc.areaName]) ||
                        ''
                      }
                      onChange={(e) => handleOnChange(e)}
                      name={acc.areaName}
                      data-name={acc.areaName}
                      placeholder={acc.placeholder}
                      className='form-textArea'
                    ></TextArea>
                  </Form>
                  {submitErrors && submitErrors[acc.areaName] && (
                    <Label
                      basic
                      color='red'
                      pointing='above'
                      className='small-text area-err'
                    >
                      {submitErrors[acc.areaName]}
                    </Label>
                  )}
                </Accordion.Content>
              )}
            </div>
          ))}
        </Accordion>
      </Container>
    </SubALayout>
  );
};

export default SubA_VIIa;
