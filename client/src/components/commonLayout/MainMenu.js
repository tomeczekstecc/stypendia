import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { leftMenuItems, rightMenuItems } from '../../parts/items';
import { AuthContext, SubmitContext } from '../../context';

const MainMenu = () => {
  const history = useHistory();
  const submitContext = useContext(SubmitContext);
  const { setSubmitMode } = submitContext;

  const [activeItem, setActiveItem] = useState('home');
  // eslint-disable-next-line no-unused-vars
  const [hasOwnSub, setHasOwnSub] = useState(false);

  const authContext = useContext(AuthContext);
  const { isLoggedIn, logOut } = authContext;

  const handleClick = (name) => {
    if (name === 'logout') {
      logOut() && history.push('/login');
    } else if (name === 'submit') {
      setSubmitMode('new');
      setActiveItem(name);
    } else setActiveItem(name);
  };

  return (
    <>
      <Menu fixed='top' fluid icon='labeled'>
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
                onClick={() => handleClick(item.name)}
              />
            </Link>
          ))}

        <Menu.Menu position='right' className='right-el'>
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
                  onClick={() => handleClick(item.name)}
                />
              </Link>
            ))}
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default MainMenu;
