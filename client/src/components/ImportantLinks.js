import React from 'react';
import {Link} from 'react-router-dom'
import { Divider, Header, Icon, Table } from 'semantic-ui-react';
import { Wrapper } from './styles/importantLinks.styles';

const ImportantLinks = () => {
  return (
    <Wrapper>
      <div className='bottom-divider'>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='linkify' />
            Ważne linki
          </Header>
        </Divider>

        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name='thumbs up' />
                <Link to='/aviability'>Deklaracja dostępności</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name='privacy' />
                <Link to='/privacy'> Polityka prywatności</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name='file alternate' />

                <Link to='/regulations'> Regulamin</Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </Wrapper>
  );
};

export default ImportantLinks;
