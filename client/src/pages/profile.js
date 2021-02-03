import React, { useContext, useEffect, useState } from 'react';
import { Button,  Header, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import { Wrapper } from './styles/profile.styles';
import { AuthContext, AppContext, AlertContext } from '../context';
import { Title, Confirm } from '../components';
import { capitalize, toLocaleDate } from '../utils';
import axios from 'axios';

const Profile = () => {
  const history = useHistory();

  const appContext = useContext(AppContext);
  const { setIsLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { checkIsAuthenticated, isLoggedIn, user, resetTimeLeft, logOut } = authContext;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // const csrfData = await axios.get('/api/v1/csrf');
    axios
      .put(`/api/v1/users/${user.uuid}`
      // , { _csrf: csrfData.data.csrfToken }
      )
      .then(async (data) => {
        console.log(data);
        if (data.data.resStatus || data.data.resStatus === 'success') {    setOpenConfirm(false)
          setIsLoading(false);
          logOut()
          history.push('/register');
        }
      })
      .catch((err) => {
        if (err.response?.data?.alertTitle) {
          setIsLoading(false);
          addAlert(err.response.data);

        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkIsAuthenticated();
    resetTimeLeft();
    !isLoggedIn && history.push('/login');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, openConfirm]);
  return (
    <Wrapper>
      <Confirm
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        greenButton='Nie, rezygnuję'
        redButton={'Tak, usuń konto'}
        greenAction={() => setOpenConfirm(false)}
        redAction={handleDelete}
        title='Usuwanie konta'
        content='Zamierzasz usunąć konto. Pamiętaj, że usunięcie konta oznacza usunięcie użytkownika, jego wniosków, kopii roboczych. Usunięcie konta nie jest możliwe, jeżeli złożyłaś/eś już wniosek. Czy jesteś pewna/y?'
      />
      <Title content='Twoje dane' />
      <div className='items-container'>
        <Header as='h2' icon textAlign='center'>
          <Icon name='user' circular />
          <Header.Content>
            {user.firstName} {user.lastName}{' '}
          </Header.Content>
        </Header>
        <Header
          className='header'
          textAlign='left'
          as='h2'
          content={capitalize(user.role)}
          subheader='Typ posiadanego konta / poziom uprawnień'
          dividing
        />
        <Header
          className='header'
          textAlign='left'
          as='h2'
          content={user.login}
          subheader='Nazwa użytkownika / służy do logowania i odzyskiwania hasła'
          dividing
        />
        <Header
          className='header'
          textAlign='left'
          as='h2'
          content={user.email}
          subheader='Email użytkownika / służy do odzyskiwania hasła oraz kontaktu z użytkownikiem'
          dividing
        />
        <Header
          className='header'
          textAlign='left'
          as='h3'
          content={toLocaleDate(user.verifiedAt)}
          subheader='Data potwierdzenia konta'
          dividing
        />
        <Header className='header' textAlign='left' as='h3' dividing>
          {toLocaleDate(user.lastPassChangeAt)}
          <Header.Subheader>
            Ostatnia zmiana hasła{' '}
            <Link to='/changepass'>
              <Button className='link' primary floated='right' size='large'>
                <Icon name='exchange' />
                Zmień hasło
              </Button>
            </Link>
          </Header.Subheader>
        </Header>

        <Header className='header' textAlign='left' as='h3' dividing>
          Usuwanie konta
          <Header.Subheader>
            Ostatnia zmiana hasła{' '}
            <Button
              onClick={() => setOpenConfirm(true)}
              className='link'
              negative
              floated='right'
              size='small'

            >
              <Icon name='trash' />
              Usuń konto
            </Button>
          </Header.Subheader>
        </Header>
      </div>
    </Wrapper>
  );
};

export default Profile;
