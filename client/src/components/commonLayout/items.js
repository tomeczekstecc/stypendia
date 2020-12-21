import { Icon } from 'semantic-ui-react';
const MENU_ICON_SIZE = 'tiny'


export const menuItems = [
  {
    id: 1,
    icon: 'home',
    name: 'start',
    title: 'Start',
    url: '/',
  },
  {
    id: 2,
    icon: 'write square',
    name: 'yourSub',
    title: 'Twój wniosek',
    url: '/sub',
  },
  {
    id: 3,
    icon: 'write',
    name: 'makeSub',
    title: 'Złóż wniosek',
    url: '/makesub',
  },
  {
    id: 4,
    icon: 'id card',
    name: 'me',
    title: 'Twoje dane',
    url: '/me',
  },
  {
    id: 5,
    icon: 'settings',
    name: 'settings',
    title: 'Ustawienia',
    url: '/settings',
  },
];
