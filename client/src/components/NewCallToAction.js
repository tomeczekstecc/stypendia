import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import SubmitContext from '../context/submit/submitContext';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { Button, Card, Icon, } from 'semantic-ui-react';

const NewCallToAction = () => {
    const authContext = useContext(AuthContext);
    const { resetTimeLeft } = authContext;

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
    resetTimeLeft()
  }, []);

  return (
    <>
      <Link to='/submit'>
        <Card.Group
          itemsPerRow={5}
          stackable
          centered
          className='cards'
          onClick={() => handleOnClick('new')}
        >

                <Card  className='card' raised>
                  <Card.Content textAlign='center'>
                    <Icon name='plus' size='big' color='black' />
                    <Icon name='pencil' size='huge' color='black' />
                  </Card.Content>
                  <Card.Content extra>
                    <Button primary size='large' icon labelPosition='right'>
                      Złóż nowy wniosek
                      <Icon name='right arrow' />
                    </Button>
                  </Card.Content>
                </Card>

        </Card.Group>
      </Link>
    </>
  );
};

export default NewCallToAction;
