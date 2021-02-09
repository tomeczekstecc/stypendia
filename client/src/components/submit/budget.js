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
  Table,
  TextArea,
} from 'semantic-ui-react';
import { accordionsVIIb, keySubjects } from '../../parts/index';
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
        <Table  definition sortable={true} celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell selectable>
                <a href='#'>Edit</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell selectable>
                <a href='#'>Edit</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Denied</Table.Cell>
              <Table.Cell selectable>
                <a href='#'>Edit</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row warning>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell selectable warning>
                <a href='#'>Requires change</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell positive>Approved</Table.Cell>
              <Table.Cell selectable positive>
                <a href='#'>Approve</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell negative>Denied</Table.Cell>
              <Table.Cell selectable negative>
                <a href='#'>Remove</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </SubALayout>
  );
};

export default Budget;
