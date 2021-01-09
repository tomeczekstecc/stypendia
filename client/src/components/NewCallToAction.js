import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import SubmitContext from '../context/submit/submitContext';

import AlertContext from '../context/alert/alertContext';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

const NewCallToAction = () => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

    const submitContext = useContext(SubmitContext);
    const {setSubmitUuid, setSubmitMode } = submitContext;

  const [drafts, setDrafts] = useState([]);


  const handleOnClick = (mode) => {
    setSubmitMode(mode);
    setSubmitUuid(null)

  };

  const setAllUsersDrafts = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/v1/drafts/oneuser', headers)
      .then((data) => {
        console.log(data);
        setDrafts(data.data.drafts);
      })
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
      <Link to='/submit'>
        <Card.Group
          itemsPerRow={5}
          stackable
          className='cards'
          onClick={() => handleOnClick('new')}
        >
          {drafts.length > 0 ? (
            drafts.map((s) => (
              <div key={s.id}>
                <Card className='card'>
                  <Card.Content textAlign='center'>
                    <Icon name='plus' size='big' color='black' />
                  </Card.Content>
                  <Card.Content extra>
                    {' '}
                    <strong>
                      <a> Złóż nowy wniosek</a>
                    </strong>
                  </Card.Content>
                </Card>
              </div>
            ))
          ) : (
            <h1>Brak wniosków</h1>
          )}
        </Card.Group>
      </Link>
    </>
  );
};

export default NewCallToAction;
