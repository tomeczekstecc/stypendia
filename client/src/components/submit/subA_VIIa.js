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
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';

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

  const [activeIndex, setActiveIndex] = useState(null);
  const [optionsActive, setOptionsActive] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    option7: false,
    option8: false,
    option9: false,
    option10: false,
    option11: false,
  });

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
            dydaktycznym. W tej tabeli wybierz dla wybranego przedmiotu <strong>trzy
            planowane</strong>  do osiągnięcia rezultaty, które uczeń zamierza osiągnąć w
            roku szkolnym 2020/2021.
          </p>
        </Message>
        <Accordion fluid styled>
          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option1: !optionsActive.option1,
              })
            }
            active={optionsActive.option1}
          >
            <Checkbox
              checked={optionsActive.option1}
              name='option1'
              toggle
              label='Udział w konkursie przedmiotowym /olimpiadzie przedmiotowej i
            uzyskanie tytułu laureata lub finalisty.'
            />
          </Accordion.Title>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option2: !optionsActive.option2,
              })
            }
            active={optionsActive.option2}
          >
            <Checkbox
              checked={optionsActive.option2}
              name='option2'
              toggle
              label='Wykonanie pracy badawczej'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option2}>
            <Form className='form-vii'>
              <TextArea
                name=''
                placeholder='Wpisz temat pracy badawczej'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option3: !optionsActive.option3,
              })
            }
            active={optionsActive.option3}
          >
            <Checkbox
              checked={optionsActive.option3}
              name='option3'
              toggle
              label='Przygotowanie referatu lub prezentacji '
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option3}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Wpisz temat referatu lub prezentacji'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option4: !optionsActive.option4,
              })
            }
            active={optionsActive.option4}
          >
            <Checkbox
              checked={optionsActive.option4}
              name='option4'
              toggle
              label='Przygotowanie publikacji '
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option4}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Wpisz temat publikacji'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option5: !optionsActive.option5,
              })
            }
            active={optionsActive.option5}
          >
            <Checkbox
              checked={optionsActive.option5}
              name='option5'
              toggle
              label='Przygotowanie wystawy'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option5}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Wpisz zakres wystawy'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option6: !optionsActive.option6,
              })
            }
            active={optionsActive.option6}
          >
            <Checkbox
              checked={optionsActive.option6}
              name='option6'
              toggle
              label='Stworzenie filmu o tematyce dotyczącej wybranego przedmiotu kierunkowego'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option6}>
            <Form className='form-vii'>
              <TextArea
                disabled={true}
                placeholder={`Temat z zakresu: ${
                  curDocument?.tab1Subj || '!!Nie wybrano przedmiotu!!!'
                }`}
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option7: !optionsActive.option7,
              })
            }
            active={optionsActive.option7}
          >
            <Checkbox
              checked={optionsActive.option7}
              name='option7'
              toggle
              label='Stworzenie programu komputerowego / aplikacji'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option7}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Opisz program komputerowy/aplikację'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option8: !optionsActive.option8,
              })
            }
            active={optionsActive.option8}
          >
            <Checkbox
              checked={optionsActive.option8}
              name='option8'
              toggle
              label='Uzyskanie certyfikatu językowego'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option8}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Wpisz planowany poziom certyfikatu'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option9: !optionsActive.option9,
              })
            }
            active={optionsActive.option9}
          >
            <Checkbox
              checked={optionsActive.option9}
              name='option9'
              toggle
              label='Otrzymanie oceny co najmniej bardzo dobrej na koniec roku szkolnego 2020/2021'
            />
          </Accordion.Title>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option10: !optionsActive.option10,
              })
            }
            active={optionsActive.option10}
          >
            <Checkbox
              checked={optionsActive.option10}
              name='option10'
              toggle
              label='Stworzenie własnej strony internetowej'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option10}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Opisz tematyke strony internetowej'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>

          <Accordion.Title
            onClick={() =>
              setOptionsActive({
                ...optionsActive,
                option11: !optionsActive.option11,
              })
            }
            active={optionsActive.option11}
          >
            <Checkbox
              checked={optionsActive.option11}
              name='option11'
              toggle
              label='Inny rezultat'
            />
          </Accordion.Title>
          <Accordion.Content active={optionsActive.option11}>
            <Form className='form-vii'>
              <TextArea
                placeholder='Opisz inny rezultat'
                className='form-textArea'
              ></TextArea>
            </Form>
          </Accordion.Content>
        </Accordion>
      </Container>
      {/* </Grid.Column>
      </Grid> */}
    </SubALayout>
  );
};

export default SubA_VIIa;
