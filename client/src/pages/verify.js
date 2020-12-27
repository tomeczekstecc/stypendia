import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import { Link } from 'react-router-dom';
import { verItems } from '../items';
import {
  Button,
  Container,
  Header,
  Icon,
  List,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import Title from '../components/Title';

const Verify = ({ location: { search }, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

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
        setIsSuccess(true);
        addAlert(data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        addAlert(err.response.data);
      });
  }, [isLoggedIn]);

  return (
    <>
      <Title content='Weryfikacja konta' />
      <Loader active={isLoading} size='huge'>
        Weryfikujemy
      </Loader>

      {!isLoading && !isSuccess && (
        <Container style={styles.msg}>
          <Message error size='big' floating>
            <Message.Header>Błąd weryfikacji danych</Message.Header>
            <p>
              Nie udało się potwierdzić konta przy użyciu tego linka. Być może
              link jest już przestarzały lub uszkodzony. Możesz skorzystać z
              mechanizmu ponownej wysyłki linka korzystając z tej strony:
              <br />
              <br />
              <Link to='/resend'>
                <Button primary size='large'>
                  Ponownie wyślij link
                </Button>
              </Link>
            </p>
          </Message>
        </Container>
      )}

      {!isLoading && isSuccess && (
        <>
          <Segment placeholder style={styles.main} size='large'>
            <Message success size='medium' floating>
              <Message.Header>Potwierdzono konto!!!</Message.Header>
              <p>
                Udało się potwierdzić konto. Od tej chili możesz się zalogować i
                złożyć wniosek.
              </p>
            </Message>

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
                        size={item.button === 'Logowanie' ? 'big' : null}
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
                        <Icon size='large' name={item.icon} /> {item.name}
                      </Header>
                    </List.Content>
                  </Link>
                </List.Item>
              ))}
            </List>
          </Segment>
        </>
      )}
    </>
  );
};

const styles = {
  main: {
    marginTop: '8rem',
  },
  leadingHeader: {
    marginBottom: '5rem',
    marginTop: '8rem',
  },
  itemHeader: {
    transform: 'translateY(8px)',
  },
  msg: {
    textAlign: 'left',
    marginTop: '15%',
  },
};

export default Verify;
