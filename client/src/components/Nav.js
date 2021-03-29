import React, { useContext, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import {
  AlertContext,
  AppContext,
  AuthContext,
  SubmitContext,
} from '../context';
import { Wrapper } from './styles/nav.styles';
import { updatePdfReady } from '../utils';

const Nav = ({ activeItem, setActiveItem, ...props }) => {
  let history = useHistory();

  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    submitMode,
    curSubmit,
    setSubmitErrors,
    tempUuid,
  } = submitContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  // const [errors, setErrors] = useState('');

  const addNewSubmit = async (submit) => {
    setIsLoading(true);
    setSubmitErrors('');

    const csrfData = await axios.get('/api/v1/csrf');
    const client = await axios.get('https://api.my-ip.io/ip.json');
    const clientIp = client.data.ip;

    axios
      .post('/api/v1/submits', {
        ...submit,
        _csrf: csrfData.data.csrfToken,
        tempUuid,
        clientIp,
      })
      .then((data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
        }
        setIsLoading(false);
        history.push('/');
      })
      .catch((err) => {
        if (err.response) {
          setSubmitErrors(err.response?.data);
          setIsLoading(false);
          return;
        }
      });
  };

  const updateSubmit = async (submit) => {
    setIsLoading(true);
    setSubmitErrors('');
    const csrfData = await axios.get('/api/v1/csrf');
    axios
      .put('/api/v1/submits', {
        ...submit,
        _csrf: csrfData.data.csrfToken,
      })
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          setIsLoading(false);
          await updatePdfReady(submit.uuid, 'up');
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          setSubmitErrors(err.response?.data);
          setIsLoading(false);

          return;
        }
      });
  };

  useEffect(() => {
    resetTimeLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          content='Zapisz'
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
