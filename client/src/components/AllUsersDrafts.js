import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AlertContext from '../context/alert/alertContext';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

const AllUsersDrafts = () => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [drafts, setDrafts] = useState([]);

  const setAllUsersDrafts = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/v1/drafts/oneuser', headers)
      .then((data) => {console.log(data); setDrafts(data.data.drafts)})
      .catch((err) => {
        if (err.response.data) {
          addAlert(err.response.data);
          return;
        }
      });

    // console.log(submits);
  };

  useEffect(() => {
    setAllUsersDrafts();
  }, []);

  return (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards'>
        {drafts.length > 0 ? (
          drafts.map((s) => (
            <div key={s.id}>
              <Card className='card'>
                <Card.Content textAlign='left'>
                <Label className='label'basic  content={'wersja robocza'} ></Label>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  />
                  <Card.Header>{s.pupilFirstName} {s.pupilLastName}</Card.Header>
                  <Card.Meta>{s.schoolType}</Card.Meta>
                  <Card.Description>
                    {s.schoolName}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>

                    <Button color='orange'>
                      Edytuj
                    </Button>
                    <Button basic color='red'>
                      Usuń
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </div>
          ))
        ) : (
          <h1>Brak wniosków</h1>
        )}
      </Card.Group>
    </>
  );
};

export default AllUsersDrafts;
