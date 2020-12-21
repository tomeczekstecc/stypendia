import React, { useState } from 'react';
import { Button, Menu, Grid } from 'semantic-ui-react';
import { menuItems } from './items';

const MainMenu = () => {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Menu icon='labeled'>
      {menuItems.map((item) => (
        <Menu.Item
          key={item.id}
          icon={item.icon}
          content={item.title}
          name={item.name}
          active={activeItem === item.name}
          onClick={() => setActiveItem(item.name)}
        />
      ))}

      <Menu.Menu position='right'>
        <Menu.Item
          icon='user'
          content='Zaloguj się'
          name='log'
          onClick={() => setActiveItem('log')}
        />

        <Menu.Item
          icon='user plus'
          content='Zarejestruj się'
          name='log'
          onClick={() => setActiveItem('log')}
        />
        <Menu.Item
          icon='user cancel'
          content='Wyloguj się'
          name='log2'
          active={false}
          onClick={() => setActiveItem('log2')}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MainMenu;
