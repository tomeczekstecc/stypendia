import React, { useContext, useEffect, useState } from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';
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
  const {
    checkIsAuthenticated,
    isLoggedIn,
    user,
    resetTimeLeft,
    logOut,
  } = authContext;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const csrfData = await axios.get('/api/v1/csrf');


    axios
      .put(`/api/v1/users/${user.uuid}`, { _csrf: csrfData.data.csrfToken })
      .then(async (data) => {

        if (data.data.resStatus || data.data.resStatus === 'success') {
          setOpenConfirm(false);
          setIsLoading(false);
          logOut();
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
    <>
      <Title as='div' content='Twoje dane' />
      <Wrapper>
        <Confirm
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
          greenButton='Nie, rezygnuję'
          redButton={'Tak, dezaktywuj konto'}
          greenAction={() => setOpenConfirm(false)}
          redAction={handleDelete}
          title='Dezaktywacja konta'
          content='Zamierzasz dezaktywować konto. Pamiętaj, że oznacza to brak dostępu do danych użytkownika, jego wniosków, kopii roboczych. Dezaktywacja nie jest możliwa, jeżeli złożyłaś/eś już wniosek. Czy jesteś pewna/y?'
        />
        <div className='items-container'>
          <div>
            {' '}
            <Header as='h3' icon textAlign='center'>
              <Icon name='user' circular />
              <Header.Content>
                {user.firstName} {user.lastName}{' '}
              </Header.Content>
            </Header>
          </div>
          <div>
            <Header
              className='header'
              textAlign='left'
              as='h3'
              content={capitalize(user.role)}
              subheader='Typ posiadanego konta / poziom uprawnień'
              dividing
            />
            <Header
              className='header'
              textAlign='left'
              as='h3'
              content={user.login}
              subheader='Nazwa użytkownika / służy do logowania i odzyskiwania hasła'
              dividing
            />
            <Header
              className='header'
              textAlign='left'
              as='h3'
              content={user.email}
              subheader='Email użytkownika / służy do odzyskiwania hasła oraz kontaktu z użytkownikiem'
              dividing
            />
            <Header
              className='header'
              textAlign='left'
              as='h4'
              content={toLocaleDate(user.verifiedAt)}
              subheader='Data potwierdzenia konta'
              dividing
            />
            <Header className='header' textAlign='left' as='h4' dividing>
              {toLocaleDate(user.lastPassChangeAt)}
              <Header.Subheader>
                Ostatnia zmiana hasła{' '}
                <Link to='/changepass'>
                  <Button className='link' primary floated='right'>
                    <Icon name='exchange' />
                    Zmień hasło
                  </Button>
                </Link>
              </Header.Subheader>
            </Header>

            <Header className='header' textAlign='left' as='h4' dividing>
              Dezaktywacja konta
              <Header.Subheader>
                Dezaktywuj konto (jeśli brak złożonych wniosków)
                <Button
                  onClick={() => setOpenConfirm(true)}
                  className='link'
                  negative
                  floated='right'
                  size='tiny'
                >
                  <Icon name='trash' />
                  Dezaktywuj konto
                </Button>
              </Header.Subheader>
            </Header>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
