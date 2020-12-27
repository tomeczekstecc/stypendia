import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { Link } from 'react-router-dom';
import { verItems } from '../items';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  List,
  Loader,
  Segment,
} from 'semantic-ui-react';
import Title from '../components/Title';

const Verify = ({ location: { search }, history }) => {
  const [isLoading, setIsLoading] = useState(true);

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn } = authContext;
  isLoggedIn && history.push('/');

  const [query, setQuery] = useState(search);

  useEffect(() => {
    checkIsAuthenticated();
    axios
      .post(`/api/v1/email/verify${query}`)
      .then((data) => {
        setIsLoading(false);
        addAlert(data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        addAlert(err.response.data);
      });
  }, [isLoggedIn]);

  return (
    <div>
      <Title content='Weryfikacja konta' />
      <Loader active={isLoading} size='huge'>
        Weryfikujemy
      </Loader>

      {!isLoading && (
        <>
          <Header textAlign='left' size='huge' style={styles.leadingHeader}>
            Świetnie!!! Udało się potwierdzić konto.
          </Header>

          <List
            size='large'
            selection
            animated
            divided
            verticalAlign='middle'
            hor
          >
            {verItems.map((item) => (
              <List.Item key={item.id}>
                <Link to={item.to}>
                  <List.Content floated='right'>
                    <Button
                      size={item.button === 'Logowanie'? 'big' : null}
                      primary={item.button === 'Logowanie'}
                      icon
                      labelPosition='right'
                    >
                      {item.button}
                      <Icon name='right arrow' />
                    </Button>
                  </List.Content>
                  <List.Content verticalAlign='bottom' floated='left'>
                    <Header as='h3' style={styles.itemHeader}>
                      <Icon name={item.icon} /> {item.name}
                    </Header>
                  </List.Content>
                </Link>
              </List.Item>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

const styles = {
  leadingHeader: {
    marginBottom: '5rem',
    marginTop: '8rem',
  },
  itemHeader: {
    transform: 'translateY(8px)',
  },
};

export default Verify;
