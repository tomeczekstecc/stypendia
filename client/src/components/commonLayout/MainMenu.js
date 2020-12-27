import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Menu } from 'semantic-ui-react';
import { leftMenuItems, rightMenuItems } from './items';
import AuthContext from '../../context/auth/authContext';

const MainMenu = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hasOwnSub, setHasOwnSub] = useState(false);


  const authContext = useContext(AuthContext);
  const { isLoggedIn, setUser } = authContext;


  return (
    <Menu icon='labeled' style={styles.main}>
      {leftMenuItems
        .filter(
          (item) =>
            (item.noOwnSubDisplay === !hasOwnSub ||
              item.hasOwnSubDisplay === hasOwnSub) &&
            item.isLoggedInDisplay === isLoggedIn
        )
        .map((item) => (
          <Link to={item.url} key={item.id}>
            <Menu.Item
              as='div'
              icon={item.icon}
              content={item.title}
              name={item.name}
              active={activeItem === item.name}
              onClick={() => setActiveItem(item.name)}
            />
          </Link>
        ))}

      <Menu.Menu position='right' style={styles.right}>
        {rightMenuItems
          .filter((item) => item.isLoggedInDisplay === isLoggedIn)
          .map((item) => (
            <Link to={item.url} key={item.id}>
              <Menu.Item
                as='div'
                icon={item.icon}
                content={item.title}
                name={item.name}
                active={activeItem === item.name}
                onClick={() => setActiveItem(item.name)}
              />
            </Link>
          ))}
      </Menu.Menu>
    </Menu>
  );
};

const styles = {
  main: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
  right: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 100,
    marginLeft: 0,
    marginRight: 0,
  },
};
export default MainMenu;
