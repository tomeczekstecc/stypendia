import React, { useContext, useEffect, useState } from 'react';
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
import { V4MAPPED } from 'dns';

const SubA_VIIa = () => {
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

  const handleOnChange = async (e) => {
    console.log(e);

    if (e.nativeEvent.path[1].dataset.type === 'checkbox') {
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

  const [curDocument, setCurDocument] = useState(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Header className='sub-header' floated='left' as='h4'>
        VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY - Przedmiot 1/2
      </Header>

      <Container textAlign='left' fluid>
        {' '}
        <Segment className='segment-vii'>
          <Header
            textAlign='left'
            floated='left'
            className='inline-position header'
            as='h4'
          >
            Przedmiot kierunkowy:
          </Header>

          <Dropdown
            disabled={!curDocument?.priLang || !curDocument?.priOtherSubj}
            floating
            fluid
            className='inline-position drop'
            selection
            data-name='tab1Subj'
            value={curDocument?.tab1Subj}
            basic
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
        <Message className='msg' info size='small' floating>
          <Message.Header>
            Planowane rezultaty. Wybierz maksymalnie 3 rezultaty.
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
        </Message>
        <Accordion fluid styled>
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
                  onChange={(e) => handleOnChange(e)}
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
                        curDocument &&
                        curDocument[acc.areaName] &&
                        curDocument[acc.areaName]
                      }
                      onChange={(e) => handleOnChange(e)}
                      name={acc.areaName}
                      data-name={acc.areaName}
                      placeholder={acc.placeholder}
                      className='form-textArea'
                    ></TextArea>
                  </Form>
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
