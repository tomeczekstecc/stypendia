import React, { useState } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import SubA_I_II from '../components/submit/subA_I_II';
import SubA_III_IV from '../components/submit/subA_III_IV';
import Nav from '../components/Nav';
import { Wrapper } from './styles/newSubmit.styles';
import Attachments from '../components/submit/Attachments';

const Submit = ({ mode }) => {
  const [activeItem, setActiveItem] = useState(1);

  const renderComponent = () => {
    if (activeItem>5) setActiveItem(1)
    if (activeItem<1) setActiveItem(1)
    switch (activeItem) {
      case 1:
        return <SubA_I_II />;
      case 2:
        return <SubA_III_IV />;
      case 3:
        return <Attachments />;
      case 4:
        return <SubA_III_IV />;
      case 5:
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
            <Menu.Item
              icon='attach'
              name='dane szkoły'
              content='Załączniki'
              active={activeItem === 3}
              onClick={() => setActiveItem(3)}
            />
            <Menu.Item
              icon='university'
              name='dane szkoły'
              content='Dane szkoły'
              active={activeItem === 4}
              onClick={() => setActiveItem(4)}
            />
            <Menu.Item
              icon='university'
              name='dane szkoły'
              content='Dane szkoły'
              active={activeItem === 5}
              onClick={() => setActiveItem(5)}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {renderComponent()}
        </Grid.Column>
        <Nav activeItem={activeItem} setActiveItem={setActiveItem} />
      </Grid>
    </Wrapper>
  );
};

export default Submit;
