import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import { leftMenuItems, rightMenuItems } from '../../items';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const MainMenu = ({ history }) => {
  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [activeItem, setActiveItem] = useState('home');
  const [hasOwnSub, setHasOwnSub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const { isLoggedIn, logOut } = authContext;

  const logOutCallback = () => {
    axios
      .get('/api/v1/users/logout')
      .then((data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          addAlert(data.data);
          history.push('/login');
          logOut();
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message)
      //   if (err.response.data.alertTitle) {
      //     console.log(err.response.data);
      //     setIsLoading(false);
      //     addAlert(err.response.data);
      //   }
      // });
      )}

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
                onClick={() => {item.name === 'logout' ? logOutCallback() : setActiveItem(item.name);}}
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
