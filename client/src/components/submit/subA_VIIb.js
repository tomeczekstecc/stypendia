import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Accordion,
  Checkbox,
  Container,
  Dropdown,
  Form,
  Header,
  Input,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
import { accordionsVIIb, keySubjects } from '../../parts/index';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import Title from '../Title';
import {
  placeCursorBack,
  clearValidation,
  clearContent,
  handleSpecialDelete,
} from '../../utils';

const SubA_VIIb = () => {
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
    if (submitMode === 'watch') return;

if (e.target.dataset.type !== 'textarea' && e.target.dataset.name !== undefined) return;

    placeCursorBack(e);
    clearValidation(e, submitErrors);
    clearContent(parent, name, curDocument);

    if (e.target.offsetParent.firstChild.type === 'checkbox') {
      if (e.target.offsetParent.firstChild.checked) {
        curDocument.tab2Results -= 1;
      } else if (!e.target.offsetParent.firstChild.checked) {
        curDocument.tab2Results += 1;
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

    if (!curDocument.tab2Results) curDocument.tab2Results = 0;
    if (
      curDocument.tab2Subj !== 'język obcy nowożytny' &&
      curDocument.tab2Subj !== 'przedmiot ICT'
    )
      curDocument.tab2SubjName = '';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Title content='Ścieżka rozwoju ucznia - tabela 2' />
      <Header className='sub-header' floated='left' as='h4'>
        VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY - Przedmiot
        kluczowy
      </Header>
      <Container textAlign='left' fluid>
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
            Przedmiot kluczowy: <span className='star'> *</span>
          </Header>

          <Dropdown
            floating
            disabled={submitMode === 'watch'}
            fluid
            className='inline-position drop'
            selection
            data-name='tab2Subj'
            value={curDocument?.tab2Subj || 'default'}
            basic
            options={keySubjects}
            onChange={(e) => handleOnChange(e)}
          />

          {(curDocument?.tab2Subj === 'język obcy nowożytny' ||
            curDocument?.tab2Subj === 'przedmiot ICT') && (
            <Input
              onKeyDown={(e) => handleSpecialDelete(e, curDocument)}
              onChange={(e) => handleOnChange(e)}
              defaultValue={curDocument?.tab2SubjName}
              name='tab2SubjName'
              data-name='tab2SubjName'
              placeholder='wpisz nazwę przedmiotu'
              className={`${
                submitMode === 'watch'
                  ? 'disabled-item inputVIIb '
                  : 'inputVIIb'
              }`}
            />
          )}
        </Segment>
        {submitErrors?.tab2Subj && (
          <Label
            basic
            color='red'
            pointing='above'
            className='small-text key-subj-err'
          >
            {submitErrors?.tab2Subj}
          </Label>
        )}
        {!submitErrors?.tab2Subj && submitErrors?.tab2SubjName && (
          <Label
            basic
            color='red'
            pointing='above'
            className='small-text key-subj-err'
          >
            {submitErrors?.tab2SubjName}
          </Label>
        )}
        <Message className='msg' info size='small' floating>
          <Message.Header>
            Planowane rezultaty - przedmiot kluczowy. Wybierz maksymalnie 3
            rezultaty. <span className='star'> *</span>
          </Message.Header>
          <p>
            Uczeń/uczennica w czasie trwania projektu jest zobowiązany do
            realizowania wskazanych celów edukacyjnych i planowanych do
            uzyskania rezultatów z dwóch wybranych przedmiotów wraz z kandydatem
            na opiekuna dydaktycznego Stypendysty/opiekunem dydaktycznym. W tej
            tabeli wybierz dla wybranego przedmiotu{' '}
            <strong>trzy planowane</strong> do osiągnięcia rezultaty, które
            uczeń/uczennica zamierza osiągnąć w roku szkolnym 2020/2021.
          </p>
          <Label className='results-counter' size='large' basic>
            Liczba wybranych rezultatów:
            {curDocument?.tab2Results} (brakuje: {3 - curDocument?.tab2Results})
          </Label>
        </Message>
        {submitErrors?.tab2Results && (
          <Label
            basic
            color='red'
            pointing='below'
            className='small-text accordion-results'
          >
            {submitErrors?.tab2Results}
          </Label>
        )}
        <Accordion
          className={submitMode === 'watch' ? 'acc-dimmed' : ''}
          fluid
          styled
        >
          {accordionsVIIb.map((acc) => (
            <div key={acc.id}>
              <Accordion.Title>
                <Checkbox
                  aria-label='checkbox'
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
                    curDocument.tab2Results >= 3 &&
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
                    <textarea
                      aria-label='textarea'
                      rows={5}
                      value={
                        (curDocument &&
                          curDocument[acc.areaName] &&
                          curDocument[acc.areaName]) ||
                        ''
                      }
                      onChange={(e) => handleOnChange(e)}
                      name={acc.areaName}
                      data-name={acc.areaName}
                      data-type='textarea'
                      placeholder={acc.placeholder}
                      className={`${
                        submitMode === 'watch'
                          ? 'form-textArea disabled-item'
                          : 'form-textArea'
                      }`}
                    ></textarea>
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

export default SubA_VIIb;
