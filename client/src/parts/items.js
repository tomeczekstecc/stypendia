import { v4 as uuidv4 } from 'uuid';
export const leftMenuItems = [
  {
    id: uuidv4(),
    icon: 'home',
    name: 'start',
    title: 'Start',
    url: '/',
    hasOwnSubDisplay: true,
    noOwnSubDisplay: true,
    isLoggedInDisplay: true,
  },
  {
    id: uuidv4(),
    icon: 'home',
    name: 'start',
    title: 'Start',
    url: '/',
    hasOwnSubDisplay: true,
    noOwnSubDisplay: true,
    isLoggedInDisplay: false,
  },
  {
    id: uuidv4(),
    icon: 'write square',
    name: 'yourSub',
    title: 'Twój wniosek',
    url: '/sub',
    hasOwnSubDisplay: true,
    noOwnSubDisplay: false,
    isLoggedInDisplay: true,
  },
  {
    id: uuidv4(),
    icon: 'pencil',
    name: 'submit',
    title: 'Złóż wniosek',
    url: '/submit',
    hasOwnSubDisplay: false,
    noOwnSubDisplay: true,
    isLoggedInDisplay: true,
  },
];



export const rightMenuItems = [
  {
    id: uuidv4(),
    icon: 'user',
    name: 'login',
    title: 'Zaloguj się',
    url: '/login',
    isLoggedInDisplay: false,
  },
  {
    id: uuidv4(),
    icon: 'user plus',
    name: 'register',
    title: 'Zarejestruj się',
    url: '/register',
    isLoggedInDisplay: false,
  },
  {
    id: uuidv4(),
    icon: 'id card',
    name: 'me',
    title: 'Twoje dane',
    url: '/profile',
    isLoggedInDisplay: true,
  },
  {
    id: uuidv4(),
    icon: 'settings',
    name: 'settings',
    title: 'Ustawienia',
    url: '/settings',
    isLoggedInDisplay: true,
  },
  {
    id: uuidv4(),
    icon: 'settings',
    name: 'settings',
    title: 'Ustawienia',
    url: '/settings',
    isLoggedInDisplay: false,
  },
  {
    id: uuidv4(),
    icon: 'user cancel',
    name: 'logout',
    title: 'Wyloguj się',
    url: '/logout',
    isLoggedInDisplay: true,
  },
  // {
  //   id: uuidv4(),
  //   icon: 'exchange',
  //   name: 'changepass',
  //   title: 'Zmień hasło',
  //   url: '/changepass',
  //   isLoggedInDisplay: true,
  // },
];

export const verItems = [
  {
    id: uuidv4(),
    icon: 'user',
    to: '/login',
    button: 'Logowanie',
    name: 'Przejdź do logowania',
  },
  {
    id: uuidv4(),
    icon: 'settings',
    to: '/settings',
    button: 'Ustawienia',
    name: 'Przejdź do ustawień',
  },
  {
    id: uuidv4(),
    icon: 'phone volume',
    to: '/contact',
    button: 'Kontakt',
    name: 'Skontaktuj się z nami',
  },
  {
    id: uuidv4(),
    icon: 'help circle',
    to: '/register',
    button: 'Pomoc',
    name: 'Przeszukaj pomoc',
  },
];
