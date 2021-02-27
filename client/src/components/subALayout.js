import React, { useContext } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import ModeLabel from './ModeLabel';
import Required from './RequiredLegend';
import { SubmitContext } from '../context';



const SubALayout = ({ children, leadHeader }) => {
  const submitContext = useContext(SubmitContext);
  const { submitMode } = submitContext;

  return (
    <>
      <Container>


        <Segment placeholder size='large'>
          <ModeLabel mode={submitMode} />
          <Grid
            className='container'
            centered
            columns={2}
            relaxed='very'
            stackable
          >
            {children}
          </Grid>
          <Required />
        </Segment>
      </Container>
    </>
  );
};

export default SubALayout;
