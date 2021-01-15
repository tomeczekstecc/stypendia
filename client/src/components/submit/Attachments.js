import React, { createRef } from 'react';
import { Button, Card, Icon, Image, Message } from 'semantic-ui-react';
import { Wrapper } from '../styles/attachments.styles';

import axios from 'axios';


const Attachments = () => {
  const fileInputRef = createRef();


  const openFileInput = (type) => {
    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(fileInputRef.current.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);
    console.log(formData);

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const res = await axios.post('/api/v1/files/upload', formData, headers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <input
        type='file'
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />
      <Message info size='medium' floating>
        <Message.Header>Dodawanie załączników</Message.Header>
        <p>
          W tej części wniosku należy dodać 3 różne typy załączników:{' '}
          <strong>
            Oświadczenie opiekun dydaktycznego, Zaświadczenie O Czymś Tam oraz
            Jakiś tam inny dokument.{' '}
          </strong>
          Pamiętaj, iż dopuszczalna wielkość każdego z plików (załączników) to
          20MB. Dopuszatne formaty plików to: <strong> .pdf, .jpg. </strong>oraz{' '}
          <strong>.png.</strong> Kliknij w odpowiednie pole, aby dodać dokument
          właściwego typu.
        </p>
      </Message>

      <Card.Group itemsPerRow={4} stackable>
        <Card className='card'>
          <Image
            className='image'
            src='https://react.semantic-ui.com/images/wireframe/image.png'
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header textAlign='left'>
              Oświadczenie opiekuna dydaktycznego
            </Card.Header>
            <Card.Meta textAlign='left'>
              <span className='date'>Dodano: 10/1/2021</span>
            </Card.Meta>
            <Card.Description textAlign='left'>
              Plik został prawodłowo dodany
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              onClick={() => openFileInput('statement')}
              basic
              negative
              icon
              labelPosition='right'
            >
              <Icon name='trash alternate outline'></Icon>
              Usuń załącznik
            </Button>
          </Card.Content>
        </Card>
        <Card>
          <Image
            src='https://react.semantic-ui.com/images/wireframe/image.png'
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header textAlign='left'>
              Zaświadczenie O Czymś Tam Ważnym
            </Card.Header>
            <Card.Meta textAlign='left'>
              <span className='date'>Dodano: 15/2/2021</span>
            </Card.Meta>
            <Card.Description textAlign='left'>
              Plik został prawodłowo dodany
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              onClick={() => openFileInput('report_card')}
              basic
              negative
              icon
              labelPosition='right'
            >
              <Icon name='trash alternate outline'></Icon>
              Usuń załącznik
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>

    </Wrapper>
  );
};

export default Attachments;
