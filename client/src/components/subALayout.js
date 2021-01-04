import React from 'react';
import {
  Container,
  Grid,
  Header,
  Label,
  Segment,
} from 'semantic-ui-react';
import { Wrapper } from '../pages/styles/submit.styles';
import Title from './Title';

const SubALayout = ({ children, leadHeader }) => {
  return (
    <>
      <Container>
        <Title content='Nowy wniosek' />
        <Wrapper>
          <Segment placeholder size='large'>
            <Label attached='top'>
              <Header>{leadHeader}</Header>
            </Label>
            <Grid
              className='container'
              centered
              columns={2}
              relaxed='very'
              stackable
            >
              {children}
            </Grid>
          </Segment>
        </Wrapper>
      </Container>
    </>
  );
};

export default SubALayout;
