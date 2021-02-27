import React, { useContext, useEffect } from 'react';
import { SubmitContext, AuthContext, AppContext } from '../context';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import NewCallToAction from './NewCallToAction';
import useFetch from '../hooks/useFetch';
import { fetchPdf } from '../services';

const AllUsersSubmits = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { resetTimeLeft, isLoggedIn } = authContext;

  const appContext = useContext(AppContext);
  const { isLoading } = appContext;

  const submitContext = useContext(SubmitContext);
  const {
    setSubmitUuid,
    setSubmitMode,
    setCurSubmit,
    setSubmitToWatch,
  } = submitContext;

  const { data } = useFetch('submits/usersubmits');

  const handleOnClick = (uuid, mode) => {
    setSubmitMode(mode);
    setSubmitUuid(uuid);

    if (mode === 'edit') {
      setCurSubmit(uuid);
    } else if (mode === 'watch') {
      setSubmitToWatch(uuid);
    }
  };

  useEffect(() => {
    resetTimeLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return !isLoading ? (
    <>
      <Card.Group itemsPerRow={5} stackable className='cards-wrapper'>
        {data.length > 0 ? (
          data.map((s) => (
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
                      className='edit-btn'
                    >
                      Popraw
                    </Button>
                  </Link>
                  <Button
                    className='pdf-btn'
                    basic
                    color='blue'
                    onClick={() => fetchPdf(s.numer)}
                  >
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
    <h2>Pobieramy dane...</h2>
  );
};

export default AllUsersSubmits;
