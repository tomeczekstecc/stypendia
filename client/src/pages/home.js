import React, { useState } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import Title from '../components/Title';
import { Wrapper } from './styles/home.styles';
import AllUsersSubmits from '../components/AllUsersSubmits';
import AllUsersDrafts from '../components/AllUsersDrafts';

const Home = () => {
  const [activeItem, setActiveItem] = useState('wnioski');


const renderActive  = () =>{
  switch (activeItem) {
    case 'wnioski':
    return <AllUsersSubmits />;
    case 'robocza':
    return <AllUsersDrafts />;
    case 'new':
    return <AllUsersDrafts />;

    default:
return <AllUsersSubmits />;
  }
}

  return (
    <>
      <Wrapper>
        <Title content='Strona statowa' />

        <Menu pointing secondary>
          <Menu.Item
            name='Wnioski'
            active={activeItem === 'wnioski'}
            onClick={() => setActiveItem('wnioski')}
          />
          <Menu.Item
            content='Wersja robocza'
            active={activeItem === 'robocza'}
            onClick={() => setActiveItem('robocza')}
          />
          <Menu.Item
            content='Złóż wniosek'
            active={activeItem === 'new'}
            onClick={() => setActiveItem('new')}
          />
        </Menu>

        <Segment>
          <Grid stackable columns={1}>

       {renderActive()}

          </Grid>
        </Segment>
      </Wrapper>
    </>
  );
};

export default Home;
