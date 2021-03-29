import React, { useContext, useEffect } from 'react';
import { SubmitContext, AuthContext, AppContext } from '../context';
import { useHistory } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import NewCallToAction from './NewCallToAction';
import useFetch from '../hooks/useFetch';
import { fetchPdf } from '../services';
import { Wrapper } from './styles/allUsersSubmits';

import { updatePdfReady } from '../utils';

const AllUsersSubmits = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const appContext = useContext(AppContext);
  const { isLoading } = appContext;

  const submitContext = useContext(SubmitContext);
  const {
    setSubmitUuid,
    setSubmitMode,
    setCurSubmit,
    setSubmitToWatch,
    curSubmit,
  } = submitContext;

  const { data } = useFetch('submits/usersubmits');

  const handleOnClick = async (uuid, mode) => {
    setSubmitMode(mode);
    setSubmitUuid(uuid);
    mode === 'edit' && updatePdfReady(uuid, 'down');

    if (mode === 'edit') {
      setCurSubmit(uuid);
      history.push('/submit');
    } else if (mode === 'watch') {
      setSubmitToWatch(uuid);
      history.push('/submit');
    }
  };

  useEffect(() => {
    resetTimeLeft();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, curSubmit.mode]);

  return !isLoading ? (
    <Wrapper>
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
                  <Button
                    color='green'
                    onClick={() => handleOnClick(s.uuid, 'watch')}
                    className='watch-btn'
                  >
                    Zobacz
                  </Button>{' '}
                  <Button primary onClick={() => handleOnClick(s.uuid, 'edit')}>
                    Popraw
                  </Button>
                  <Button
                    disabled={s.pdfReady === 0}
                    className='pdf-btn'
                    basic
                    color='blue'
                    onClick={() => fetchPdf(s.numer)}
                  >
                    <Icon name='download' />
                    <strong>PDF</strong>
                  </Button>
                </div>
              </Card.Content>
              {s.pdfReady === 0 && (
                <span className='ausWarning'>
                  Wniosek nie został poprawnie zwalidowany. Wejdź w tryb edycji
                  ("Popraw") i ponownie zapisz wniosek
                </span>
              )}
            </Card>
          ))
        ) : (
          <>
            <NewCallToAction />
          </>
        )}
      </Card.Group>
    </Wrapper>
  ) : (
    <h2>Pobieramy dane...</h2>
  );
};

export default AllUsersSubmits;
