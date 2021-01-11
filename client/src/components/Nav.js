import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import SubmitContext from '../context/submit/submitContext';
import { useHistory } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';
import AppContext from '../context/app/appContext';
import { Wrapper } from './styles/nav.styles';
import axios from 'axios';

const Nav = ({ activeItem, setActiveItem, ...props }) => {
  let history = useHistory();

  const submitContext = useContext(SubmitContext);
  const { newSubmit, submitMode, curSubmit } = submitContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const addNewSubmit = (submit) => {
    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post('/api/v1/submits', submit, headers)
      .then((data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
        }
        setIsLoading(false);
        history.push('/');
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          addAlert(err.response.data);

          return;
        }
      });
  };

  const updateSubmit = (submit) => {
    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .put('/api/v1/submits', submit, headers)
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setIsLoading(false);
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.response) {
          addAlert(err.response.data);
          setIsLoading(false);

          return;
        }
      });
  };

  return (
    <Wrapper mode={submitMode}>
      <Button.Group size='medium'>
        <Button
          onClick={() => setActiveItem(activeItem - 1)}
          className='nav-button'
          labelPosition='left'
          icon='left chevron'
          content='Wróć'
        />
        <Button
          className='nav-button save'
          onClick={() => updateSubmit(curSubmit)}
          primary
          loading={isLoading}
          icon='save'
          content='Zapisz zmiany'
        />
        <Button
          className='nav-button submit'
          positive
          loading={isLoading}
          onClick={() => addNewSubmit(newSubmit)}
          icon='thumbs up'
          content='Złóż'
        />
        <Button
          onClick={() => setActiveItem(activeItem + 1)}
          className='nav-button'
          labelPosition='right'
          icon='right chevron'
          content='Dalej'
        />
      </Button.Group>
    </Wrapper>
  );
};

export default Nav;
