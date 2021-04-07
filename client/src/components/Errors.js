import React, { useContext, useEffect, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { mapErrors } from '../utils/mapErrors';
import { SubmitContext } from '../context';
import { Wrapper } from './styles/errors.style';
import { Link } from 'react-router-dom';
import { mapLink } from '../utils/mapLink';

const Errors = ({ setActiveItem }) => {
  const submitContext = useContext(SubmitContext);
  const { submitErrors } = submitContext;

  const [open, setOpen] = useState(!!submitErrors);

  const handleClick = (link) => {
    setOpen(false);
    setActiveItem(link);
  };
  useEffect(() => {
    setOpen(!!submitErrors);
  }, [submitErrors]);

  const mapped = mapErrors(submitErrors);
  const content =
    submitErrors &&
    `W formularzu należy poprawić błędnie wprowadzone dane. Liczba błędów: ${mapped.length}.
    Kliknij w błąd, aby przejść do dpowiedniej strony`;

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
          <Header size='small' content={content} />

          <div>
            {mapped &&
              mapped.map((e, i) => {
                const link = mapLink(e);
                return (
                  <div
                    onClick={() => handleClick(link)}
                    className='errorek'
                    style={{
                      color: '#eb0000',
                      fontWeight: 'bold',
                    }}
                    key={e}
                  >
                    <Link style={{ color: '#eb0000' }} to='/submit'>
                      {e && i + 1 + '. '} {e}{' '}
                    </Link>
                  </div>
                );
              })}
          </div>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button> */}
          <Button id='buttonik11' onClick={() => setOpen(false)}>
            <Icon id='checkmark11' name='checkmark' /> Rozumiem
          </Button>
        </Modal.Actions>
      </Modal>
    </Wrapper>
  );
};

export default Errors;
