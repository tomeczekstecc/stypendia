import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SubmitContext from '../context/submit/submitContext';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';
// import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import NewCallToAction from './NewCallToAction';

const AllUsersSubmits = () => {
    const authContext = useContext(AuthContext);
    const { resetTimeLeft } = authContext;

  const appContext = useContext(AppContext);
  const { setIsLoading, isLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const submitContext = useContext(SubmitContext);
  const {
    setSubmitUuid,
    setSubmitMode,
    setCurSubmit,
    setSubmitToWatch,
  } = submitContext;

  const [submits, setSubmits] = useState([]);

  const handleOnClick = (uuid, mode) => {
    setSubmitMode(mode);
    setSubmitUuid(uuid);

    if (mode === 'edit') {
      setCurSubmit(uuid);
    } else if (mode === 'watch') {
      setSubmitToWatch(uuid);
    }
  };

  const setAllUsersSubmits = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/v1/submits/usersubmits', headers)
      .then((data) => setSubmits(data.data.submits))
      .catch((err) => {
     
        if (err.response.data) {
          addAlert(err.response.data);
          return;
        }
      });
  };

  const callFetch = (numer) => {
    axios
      .get(`/api/v1/pdf/submit/${numer}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${numer}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  };

  useEffect(() => {
    setAllUsersSubmits();
    setIsLoading(false);
    resetTimeLeft()
  }, []);

  return !isLoading ? (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards'>
        {submits.length > 0 ? (
          submits.map((s) => (
            <Card key={s.id} className='card' raised>
              <Card.Content className='relative' textAlign='left'>
                <Label
                  className='label'
                  // basic
                  size='mini'
                  color='grey'
                  content={'oczekuje na decyzje'}
                ></Label>
                <Image
                  floated='left'
                  size='mini'
                  src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                />

                <Card.Header>
                  {s.pupilFirstName} {s.pupilLastName}
                </Card.Header>
                <Card.Meta>{s.schoolType}</Card.Meta>
                <Card.Description>Nuner wniosku: {s.numer}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui three buttons'>
                  <Link to='/submit'>
                    <Button
                      color='green'
                      onClick={() => handleOnClick(s.uuid, 'watch')}
                    >
                      Zobacz
                    </Button>
                    <Button
                      primary
                      onClick={() => handleOnClick(s.uuid, 'edit')}
                    >
                      Popraw
                    </Button>
                  </Link>
                  <Button basic color='blue' onClick={() => callFetch(s.numer)}>
                    <Icon name='download' />
                    <strong> PDF</strong>
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))
        ) : (
          <>

            <NewCallToAction />
          </>
        )}
      </Card.Group>
    </>
  ) : (
    <h2>Loading</h2>
  );
};

export default AllUsersSubmits;
