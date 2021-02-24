import React from 'react';
import {
  Container,
  Grid,
  Segment,
} from 'semantic-ui-react';
import Required from './RequiredLegend';

import Title from './Title';

const SubALayout = ({ children, leadHeader }) => {
  return (
    <>
      <Container>
        <Title content='Nowy wniosek' />

          <Segment placeholder size='large'>

            <Grid
              className='container'
              centered
              columns={2}
              relaxed='very'
              stackable
            >
              {children}
            </Grid>
            <Required/>
          </Segment>

      </Container>
    </>
  );
};

export default SubALayout;
