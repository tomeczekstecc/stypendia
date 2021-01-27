import React, { useContext, useEffect } from 'react';

import { Button, Card, Image, Label } from 'semantic-ui-react';
import NewCallToAction from './NewCallToAction';
import { AuthContext, AppContext } from '../context';
import useFetch from '../hooks/useFetch';

const AllUsersDrafts = () => {
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const appContext = useContext(AppContext);
  const { isLoading } = appContext;

  const { data } = useFetch('drafts/oneuser');

  useEffect(() => {
    resetTimeLeft();
  }, []);

  return !isLoading ? (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards'>
        {data.length > 0 ? (
          data.map((s) => (
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
  ) : (
    <h2>Pobieramy dane...</h2>
  );
};

export default AllUsersDrafts;
