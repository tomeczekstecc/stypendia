import React, { useState } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import SubA_I_II from '../components/subA_I_II';
import SubA_III_IV from '../components/subA_III_IV';
import Nav from '../components/Nav';
import {Wrapper} from './styles/newSubmit.styles'


const NewSubmit = () => {

  const [activeItem, setActiveItem] = useState(1);

  const renderComponent = () => {
    switch (activeItem) {
      case 1:
        return <SubA_I_II />;
      case 2:
        return <SubA_III_IV />;

      default:
        return <SubA_I_II />;
    }
  };

  return (
    <Wrapper>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              icon='student'
              name='Dane ucznia'
              active={activeItem === 1}
              onClick={() => setActiveItem(1)}
            />
            <Menu.Item
              icon='university'
              name='dane szkoły'
              content='Dane szkoły'
              active={activeItem === 2}
              onClick={() => setActiveItem(2)}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {renderComponent()}

        </Grid.Column>
        <Nav />
      </Grid>
    </Wrapper>
  );
};

export default NewSubmit;
