import React, { useContext, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import {AlertContext, AppContext, AuthContext,SubmitContext} from '../context';
import { Wrapper } from './styles/nav.styles';

const Nav = ({ activeItem, setActiveItem, ...props }) => {
  let history = useHistory();

    const authContext = useContext(AuthContext);
    const {resetTimeLeft} = authContext;

  const submitContext = useContext(SubmitContext);
  const { newSubmit, submitMode, curSubmit } = submitContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const addNewSubmit = async (submit) => {
    const csrfData = await axios.get('/api/v1/csrf');
    setIsLoading(true);
    const newSubmit = { ...submit, _csrf: csrfData.data.csrfToken };
    axios
      .post('/api/v1/submits', newSubmit)
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

  const updateSubmit = async (submit) => {
    const csrfData = await axios.get('/api/v1/csrf');
    setIsLoading(true);
    const newSubmit = { ...submit, _csrf: csrfData.data.csrfToken };
    axios
      .put('/api/v1/submits', newSubmit)
      .then((data) => {
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

  useEffect(() => {

    resetTimeLeft();
  }, []);

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
