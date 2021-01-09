import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SubmitContext from '../context/submit/submitContext';
import AlertContext from '../context/alert/alertContext';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

const AllUsersSubmits = () => {
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
  const [isLoading, setIsLoading] = useState(true);

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
      // .then((data) => setSubmits(data.data.submits))
      .then((data) => setSubmits(data.data.submits))
      .catch((err) => {
        console.log(err.response);
        if (err.response.data) {
          addAlert(err.response.data);
          return;
        }
      });
  };

  useEffect(() => {
    setAllUsersSubmits();
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards'>
        {submits.length > 0 ? (
          submits.map((s) => (
            <div key={s.id}>
              <Card className='card'>
                <Card.Content textAlign='left'>
                  <Label
                    className='label'
                    basic
                    content={'oczekuje na decyzje'}
                  ></Label>
                  <Image
                    floated='right'
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
                      <Button
                        basic
                        color='blue'
                        onClick={() => handleOnClick(s.uuid, 'getPdf')}

                      >
                      <Icon name='download'/>
                        <strong> PDF</strong>
                      </Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </div>
          ))
        ) : (
          <h3>Brak wniosków</h3>
        )}
      </Card.Group>
    </>
  ) : (
    <h2>Loading</h2>
  );
};

export default AllUsersSubmits;
