import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitContext, AuthContext } from '../context';
import { Button, Card, Icon } from 'semantic-ui-react';
import {Wrapper} from './styles/newCallToAction.styles'

const NewCallToAction = () => {
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const submitContext = useContext(SubmitContext);
  const { setSubmitUuid, setSubmitMode } = submitContext;

  const handleOnClick = (mode) => {
    setSubmitMode(mode);
    setSubmitUuid(null);
  };

  useEffect(() => {
    resetTimeLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Link to='/submit'>
        <Card.Group
          itemsPerRow={5}
          stackable
          centered
          className='cards'
          onClick={() => handleOnClick('new')}
        >
          <Card className='card' raised>
            <Card.Content textAlign='center'>
              <Icon name='plus' size='big' color='black' />
              <Icon name='pencil' size='huge' color='black' />
            </Card.Content>
            <Card.Content extra>
              <Button className='new-btn'  primary  icon labelPosition='right'>
                Nowy wniosek
                <Icon name='right arrow' />
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </Link>
    </Wrapper>
  );
};

export default NewCallToAction;


