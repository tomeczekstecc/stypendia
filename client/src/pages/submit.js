/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useState } from 'react';
import { Grid, Menu } from 'semantic-ui-react';

import {
  SubA_I_II,
  SubA_III_IV,
  Attachments,
  SubA_V_VI,
  SubA_VIIa,
  SubA_VIIb,
  Nav,
  Errors,
} from '../components';
import { Wrapper } from './styles/submit.styles';
import { SubmitContext } from '../context';

const Submit = () => {
  const submitContext = useContext(SubmitContext);
  const { submitMode } = submitContext;

  const [activeItem, setActiveItem] = useState(1);

  const renderComponent = () => {
    if (activeItem > 6) setActiveItem(1);
    if (activeItem < 1) setActiveItem(1);
    switch (activeItem) {
      case 1:
        return <SubA_I_II />;
      case 2:
        return <SubA_III_IV />;
      case 3:
        return <SubA_V_VI />;
      case 4:
        return <SubA_VIIa />;
      case 5:
        return <SubA_VIIb />;
      case 6:
        return <Attachments />;

      default:
        return <SubA_VIIa />;
    }
  };

  return (
    <Wrapper submitMode={submitMode}>
      <Errors />
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular className='menu'>
            <Menu.Item
              icon='student'
              name='Dane ucznia'
              content='Dane osobowe'
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
              icon='sliders horizontal'
              name='base'
              content='Kryteria oceny'
              active={activeItem === 3}
              onClick={() => setActiveItem(3)}
            />
            <Menu.Item
              icon='chart line'
              name='sciezka'
              content='Ścieżka rozwoju [Tab1]'
              active={activeItem === 4}
              onClick={() => setActiveItem(4)}
            />
            <Menu.Item
              icon='chart line'
              name='sciezka2'
              content=' Ścieżka rozwoju [Tab2]'
              active={activeItem === 5}
              onClick={() => setActiveItem(5)}
            />
            <Menu.Item
              icon='attach'
              name='dane szkoły'
              content='Załączniki'
              active={activeItem === 6}
              onClick={() => setActiveItem(6)}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {renderComponent()}
          <Nav activeItem={activeItem} setActiveItem={setActiveItem} />
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default Submit;
