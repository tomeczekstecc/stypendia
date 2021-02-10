import React, { useContext, useEffect, useState } from 'react';
import {
  Accordion,
  Checkbox,
  Container,
  Form,
  Header,
  Label,
  Message,
  Table,
  TextArea,
} from 'semantic-ui-react';
import { budgetRows } from '../../parts';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';

const Budget = () => {
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

  const handleOnChange = async (e) => {
    if (submitMode === 'watch') return;

    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        [e.target.name]: +e.target.value,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        [e.target.name]: +e.target.value,
      });
    }
  };
  const handleOnChange2 = async (e) => {
    if (submitMode === 'watch') return;
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
  };

  const updateTotalCosts = (curSubmit) => {
    let arr = [];
    for (const [key, value] of Object.entries(curSubmit)) {
      if (!isNaN(+value)) {
        if (key.slice(0, 4) === 'cost') {
          arr.push(value);
        }
        const total = arr.reduce((acc, cur) => {
          return acc + cur;
        }, 0);
        curDocument.totalCosts = total;
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
    curDocument && updateTotalCosts(curDocument);
    console.log(curDocument?.totalCosts?.toLocaleString('pl-PL'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Header className='sub-header' floated='left' as='h4'>
        VIII. PLAN WYDATKÓW
      </Header>
      <Container textAlign='left'>
        <Message className='msg' info size='small'>
          <Message.Header>
            Lista planowanych wydatków na realizację ścieżki rozwoju{' '}
          </Message.Header>
          <div>
            <ol>
              <li>
                Należy przedstawić szacunkowy plan wydatków związanych z
                realizacją działań zmierzających do osiągnięcia celów
                edukacyjnych i rezultatów na okres otrzymywania stypendium.{' '}
              </li>
              <li>
                Planowane wydatki muszą mieścić się w katalogu kosztów,
                wskazanym w § 8 ust. 5 Regulaminu przyznawania stypendiów w
                ramach projektu Śląskie. Inwestujemy w talenty – VI edycja.
                Wydatki należy wykazać na kwotę (sumę) nie mniejszą niż
                przewidywana wartość stypendium, tj. 5 000,00 PLN. Szczegółowy
                opis wydatków kwalifikowalnych w obrębie poszczególnych
                katalogów zawarty jest w załączniku nr 1 do regulaminu.{' '}
              </li>
              <li>
                W przypadku Stypendystów, którzy uczestniczyli w poprzedniej
                edycji projektu „Śląskie. Inwestujemy w talenty”, planowanie
                zakupu przedmiotów, o których mowa w ust. 5 pkt 2 - 4, tożsamych
                z już zakupionymi ze środków stypendialnych, otrzymanych w
                ramach poprzedniej edycji projektu jest możliwe, tylko w
                uzasadnionych przypadkach. Wnioskodawca będzie zobowiązany do
                złożenia stosownego oświadczenia, zawartego we Wniosku.
              </li>
            </ol>
          </div>{' '}
        </Message>
      </Container>
      <Container textAlign='left' fluid>
        <Table className='table' sortable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>LP</Table.HeaderCell>
              <Table.HeaderCell>Katalogi wydatków</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>
                <span>
                  Szacunkowy koszt <br /> w pełnych złotych (PLN)
                </span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {budgetRows.map((r, i) => (
            <Table.Body key={r.id}>
              <Table.Row>
                <Table.Cell textAlign='center'>{i + 1}</Table.Cell>
                <Table.Cell>{r.categoryName}</Table.Cell>
                <Table.Cell textAlign='right' className='input-cell' selectable>
                  <input
                    onChange={(e) => handleOnChange(e)}
                    name={r.costName}
                    data-name={r.costName}
                    className='table-input'
                    value={
                      (curDocument[r.costName] && +curDocument[r.costName]) || 0
                    }
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell textAlign='right' colSpan='2'>
                Razem
              </Table.HeaderCell>
              <Table.HeaderCell
                className={curDocument?.totalCosts < 5000 ? 'cell-red' : null}
                textAlign='right'
              >
                <div>
                  <strong
                    className={curDocument?.totalCosts < 5000 ? 'red' : null}
                  >
                    {curDocument?.totalCosts?.toLocaleString('pl-PL', {
                      style: 'currency',
                      currency: 'PLN',
                    }) ||
                      (0).toLocaleString('pl-PL', {
                        style: 'currency',
                        currency: 'PLN',
                      })}
                  </strong>
                </div>
                {submitErrors?.totalCosts && (
                  <Label
                    basic
                    color='red'
                    pointing='above'
                    className='small-text table-err'
                  >
                    {submitErrors?.totalCosts}
                  </Label>
                )}
                <div
                  className={
                    curDocument?.totalCosts < 5000 && !submitErrors?.totalCosts
                      ? 'visible'
                      : 'hidden'
                  }
                >
                  Wartość planu wydatków nie może być niższa niż 5000,00 PLN
                </div>
              </Table.HeaderCell>{' '}
            </Table.Row>
          </Table.Footer>
        </Table>
        <Accordion fluid styled>
          <Accordion.Title active>
            Uzasadnienie planowanych wydatków, które nie mieszczą się w katalogu
            wskazanym w § 8 ust. 5 Regulaminu - jeśli dotyczy
          </Accordion.Title>

          <Accordion.Content active={true}>
            <Form className='form-vii'>
              <TextArea
                value={
                  (curDocument &&
                    curDocument.substantion1 &&
                    curDocument.substantion1) ||
                  ''
                }
                onChange={(e) => handleOnChange2(e)}
                name='substantion1'
                data-name='substantion1'
                placeholder='Wpisz uzasadnienie'
                className='form-textArea substantion'
              ></TextArea>
            </Form>
            {submitErrors && submitErrors.substantion1 && (
              <Label
                basic
                color='red'
                pointing='above'
                className='small-text area-err'
              >
                {curDocument?.substantion1}
              </Label>
            )}
          </Accordion.Content>

          <Accordion.Title active>
            Uzasadnienie zakupu sprzętu tożsamego z już zakupionym sprzętem ze
            środków stypendialnych otrzymanych w ramach projektu „Śląskie.
            Inwestujemy w talenty – V edycja” - jeśli dotyczy
          </Accordion.Title>

          <Accordion.Content active={true}>
            <Form className='form-vii'>
              <TextArea
                value={
                  (curDocument &&
                    curDocument.substantion2 &&
                    curDocument.substantion2) ||
                  ''
                }
                onChange={(e) => handleOnChange2(e)}
                name='substantion2'
                data-name='substantion2'
                placeholder='Wpisz uzasadnienie'
                className='form-textArea substantion'
              ></TextArea>
            </Form>
            {submitErrors && submitErrors.substantion2 && (
              <Label
                basic
                color='red'
                pointing='above'
                className='small-text area-err'
              >
                {curDocument?.substantion2}
              </Label>
            )}
          </Accordion.Content>
        </Accordion>
      </Container>
    </SubALayout>
  );
};

export default Budget;
