import React, { useContext, useEffect, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { mapErrors } from '../utils/mapErrors';
import { SubmitContext } from '../context';
import { Wrapper } from './styles/errors.style';

const Errors = () => {
  const submitContext = useContext(SubmitContext);
  const { submitErrors } = submitContext;


  const [open, setOpen] = useState(!!submitErrors);
  useEffect(() => {
    setOpen(!!submitErrors);
  }, [submitErrors]);

  const mapped = mapErrors(submitErrors);

  return (
    <Wrapper>
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='exclamation circle' content='Wykryto niepoprawne dane' />
        <Modal.Content>
          <Header
            size='small'
            content='W formularzu należy poprawić błędnie wprowadzone dane:'
          />
          {/* <strong>Dane ucznia:</strong> */}
          <div>
            {mapped &&
              mapped.map((e) => (
                <div
                  className='error'
                  style={{ color: 'red', fontWeight: 'bold' }}
                  key={e}
                >
                  {e}
                </div>
              ))}
          </div>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button> */}
          <Button primary onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Rozumiem
          </Button>
        </Modal.Actions>
      </Modal>
    </Wrapper>
  );
};

export default Errors;
