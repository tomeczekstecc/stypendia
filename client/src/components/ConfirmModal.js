import axios from 'axios';
import { useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ConfirmModal = ({
  openConfirm,
  setOpenConfirm,
  title,
  content,
  greenButton,
  redButton,
  redAction,
  greenAction,
}) => {
  const handleConfirm = () => {
    axios.delete('/');
  };

  return (
    <Modal
      closeIcon
      open={openConfirm}
      onClose={() => setOpenConfirm(false)}
      onOpen={() => setOpenConfirm(true)}
    >
      <Header icon='remove' content={title} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={greenAction}>
          <Icon name='checkmark' /> {greenButton}
        </Button>
        <Button color='red' onClick={redAction}>
          <Icon name='remove' />
          {redButton}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;
