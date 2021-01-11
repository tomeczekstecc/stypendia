import React from 'react';
import { Button, Card, Icon, Image,Message } from 'semantic-ui-react';
import {Wrapper} from '../styles/attachments.styles';

const Attachments = () => {
  return (
    <Wrapper>
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
            <Button basic negative icon labelPosition='right'>
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
            <Button basic negative icon labelPosition='right'>
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
