import React, { useContext, useEffect, useState } from 'react';
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
  TextArea,
} from 'semantic-ui-react';
import { accordionsVIIb, keySubjects } from '../../parts/index';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';

const SubA_VIIb = () => {
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

  const [curDocument, setCurDocument] = useState({});

  const handleOnChange = async (e, parent = undefined, name = undefined) => {
    if (submitMode === 'watch') return;
    if (parent && name) {
      if (curDocument && curDocument[parent] && curDocument[parent] === true) {
        curDocument[name] = '';
      }
    }

    if (e.nativeEvent.path[1].dataset.type === 'checkbox') {
      if (e.nativeEvent.path[1].children[0].checked) {
        curDocument.tab2Results -= 1;
      } else if (!e.nativeEvent.path[1].children[0].checked) {
        curDocument.tab2Results += 1;
      }

      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
          [e.nativeEvent.path[1].dataset.name]: !e.nativeEvent.path[1]
            .children[0].checked,
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
          [e.nativeEvent.path[1].dataset.name]: !e.nativeEvent.path[1]
            .children[0].checked,
        });
      }
    } else {
      if (submitMode === 'edit') {
        await updateCurSubmit({
          ...curSubmit,
          [e.nativeEvent.path[1].dataset.name ||
          e.nativeEvent.path[2].dataset.name ||
          e.nativeEvent.path[3].dataset.name ||
          e.target.dataset.name]: e.target.value || e.target.innerText,
        });
      } else if (submitMode === 'new') {
        await updateNewSubmit({
          ...newSubmit,
          [e.nativeEvent.path[1].dataset.name ||
          e.nativeEvent.path[2].dataset.name ||
          e.nativeEvent.path[3].dataset.name ||
          e.target.dataset.name]: e.target.value || e.target.innerText,
        });
      }
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
      <Header className='sub-header' floated='left' as='h4'>
        VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY - Przedmiot
        kluczowy
      </Header>

      <Container textAlign='left' fluid>
        <Segment className='segment-vii'>
          <Header
            textAlign='left'
            floated='left'
            className='inline-position header'
            as='h4'
          >
            Przedmiot kluczowy:
          </Header>

          <Dropdown
            floating
            fluid
            className='inline-position drop'
            selection
            data-name='tab2Subj'
            value={curDocument?.tab2Subj}
            basic
            options={keySubjects}
            defaultValue='default'
            onChange={(e) => handleOnChange(e)}
          />

          {(curDocument?.tab2Subj === 'język obcy nowożytny' ||
            curDocument?.tab2Subj === 'przedmiot ICT') && (
            <Input
              onChange={(e) => handleOnChange(e)}
              value={curDocument?.tab2SubjName}
              name='tab2SubjName'
              data-name='tab2SubjName'
              placeholder='wpisz nazwę przedmiotu'
              className='inputVIIb'
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
            rezultaty.
          </Message.Header>
          <p>
            Uczeń/uczennica w czasie trwania projektu jest zobowiązany do
            realizowania wskazanych celów edukacyjnych i planowanych do
            uzyskania rezultatów. z dwóch wybranych przedmiotów wraz z
            kandydatem na opiekuna dydaktycznego Stypendysty/opiekunem
            dydaktycznym. W tej tabeli wybierz dla wybranego przedmiotu{' '}
            <strong>trzy planowane</strong> do osiągnięcia rezultaty, które
            uczeń zamierza osiągnąć w roku szkolnym 2020/2021.
          </p>
          <Label size='large' basic color='teal'>
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
        <Accordion fluid styled>
          {accordionsVIIb.map((acc) => (
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

export default SubA_VIIb;
