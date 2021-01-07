import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AlertContext from '../context/alert/alertContext';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

const AllUsersSubmits = () => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [submits, setSubmits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setAllUsersSubmits = () => {

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/v1/submits/oneuser', headers)
      // .then((data) => setSubmits(data.data.submits))
      .then((data) => setSubmits(data.data.submits))
      .catch((err) => {
        if (err.response.data.forcePassChange) {
          addAlert(err.response.data);
          return;
        }
      });

    };

    useEffect(() => {
      setAllUsersSubmits();
      setIsLoading(false)
  }, []);

  return ( !isLoading ?
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
                  <Card.Description>{s.schoolName}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui three buttons'>
                    <Button color='green'>Zobacz</Button>
                    <Button color='orange'>Edytuj</Button>
                    <Button basic color='blue'>
                      Pobierz
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </div>
          ))
        ) : (
          <h3>Brak wniosków</h3>
        )}
      </Card.Group>
    </> : <h2>Loading</h2>
  );
};

export default AllUsersSubmits;
