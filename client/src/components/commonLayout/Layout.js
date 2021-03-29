import React, { useContext } from 'react';
import { Grid, Label } from 'semantic-ui-react';
import CookieConsent from 'react-cookie-consent';
import MainMenu from './MainMenu';
import {Wrapper} from '../styles/layout.styles'
import Timer from '../Timer';
import AuthContext from '../../context/auth/authContext';

const Layout = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
  return (
    <Wrapper>
      <MainMenu />
      <Grid centered verticalAlign='middle' style={{ boxSizing: 'border-box' }}>
        {children}
        {isLoggedIn && <Timer />}
      </Grid>

      <CookieConsent
        location='bottom'
        buttonText='Ok, rozumiem'
        cookieName='styp_cookies_consest'
        style={{
          background: '#1578c2',
          fontSize: '16px',
          lineHeight: '28px',
          paddingLeft: '150px',
          paddingRight: '150px',
        }}
        buttonStyle={{
          color: '#4e503b',
          borderRadius: '3px',
          padding: '8px 12px',
          fontFamily: 'Lato, sans-serif',
          fontSize: '16px',
          background: '#CACBCD',
          fontWeight: 'bold',
        }}
        expires={150}
      >
        Strona i jej elementy wykorzystują pliki cookies m.in. w celu
        poprawienia jej dostępności, personalizacji, obsługi kont użytkowników.
        Każdy może sam decydować o tym czy dopuszcza pliki cookies, ustawiając
        odpowiednio swoją przeglądarkę. Dowiedz się więcej na stronie{' '}
        <a
          className='cookies-link'
          href='https://pl.wikipedia.org/wiki/HTTP_cookie'
        >
          <Label basic> https://pl.wikipedia.org/wiki/HTTP_cookie</Label>
        </a>
        <span style={{ fontSize: '10px' }}></span>
      </CookieConsent>
    </Wrapper>
  );
};

export default Layout;
