import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Wrapper } from './styles/privacy.styles';
import {useHistory}from 'react-router-dom';

const Privacy = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Header as='h2' attached='top'>
        Polityka prywatności
      </Header>
      <Segment textAlign='left' attached>
        <p>
          {' '}
          Dla strony staskietalenty.com wykorzystywane są pliki Cookies
          przechowujące identyfikator sesji. Są one niezbędne do przechowania
          informacji o fakcie bycia uwierzytelnionym w serwisie, personalizacji
          ustawień, czy też wyszukiwania informacji w serwisie. Mechanizm
          Cookies nie jest wykorzystywany do pozyskiwania jakichkolwiek
          informacji o użytkownikach serwisu ani śledzenia ich nawigacji. Pliki
          Cookies stosowane w serwisach nie przechowują żadnych danych osobowych
          ani innych informacji zebranych od użytkowników. Mechanizm Cookies
          jest domyślnie włączony w większości przeglądarek internetowych co
          umożliwia zapisywanie plików cookies na urządzeniu klienta. Mechanizm
          ten może być wyłączony lub przełączony w tryb informowania o
          każdorazowej próbie zapisywania informacji na urządzeniu klienta.
          Wyłączenie Mechanizmu Cookies może spowodować utrudnienia korzystanie
          z niektórych elementów serwisów internetowych.
        </p>

        <Button
          onClick={() => history.goBack()}
          color='primary'
          labelPosition='left'
          icon='left chevron'
          content='Wróć'
        />
      </Segment>
    </Wrapper>
  );
};

export default Privacy;
