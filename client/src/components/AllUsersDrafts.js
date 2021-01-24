import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card,Image, Label } from 'semantic-ui-react';
import NewCallToAction from './NewCallToAction';
import {AuthContext,AlertContext }from '../context';

const AllUsersDrafts = () => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

      const authContext = useContext(AuthContext);
      const { resetTimeLeft } = authContext;

  const [drafts, setDrafts] = useState([]);

  const setAllUsersDrafts = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/v1/drafts/oneuser', headers)
      .then((data) => {
        setDrafts(data.data.drafts);
      })
      .catch((err) => {
        if (err.response.data) {
          addAlert(err.response.data);
          return;
        }
      });

  };

  useEffect(() => {
    setAllUsersDrafts();
    resetTimeLeft()
  }, []);

  return (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards'>
        {drafts.length > 0 ? (
          drafts.map((s) => (
            <Card key={s.id} className='card' raised>
              <Card.Content textAlign='left'>
                <Label
                  className='label'
                  // basic
                  size='mini'
                  content={'wersja robocza'}
                  color='orange'
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
                <Card.Description>{s.schoolName}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button color='orange'>Edytuj</Button>
                  <Button basic color='red'>
                    Usuń
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))
        ) : (
          <NewCallToAction />
        )}
      </Card.Group>
    </>
  );
};

export default AllUsersDrafts;
