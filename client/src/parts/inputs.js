import { v4 as uuidv4 } from 'uuid';

export const registerInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę (od 2 do 50 znaków)',
    type: 'text',
    name: 'login',
  },
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Imię',
    placeholder: 'Podaj swoje imię (od 2 do 254 znaków)',
    type: 'text',
    name: 'firstName',
  },
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwisko',
    placeholder: 'Podaj swoje nazwisko (od 2 do 254 znaków)',
    type: 'text',
    name: 'lastName',
  },
  {
    id: uuidv4(),
    icon: 'mail',
    label: 'Email',
    placeholder: 'Podaj swój email',
    type: 'email',
    name: 'email',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło (od 8 do 24 znaków)',
    type: 'password',
    name: 'password',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Powtórz hasło',
    placeholder: 'Powtórz hasło',
    type: 'password',
    name: 'passwordConfirm',
  },
];

export const loginInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę użytkownika',
    type: 'text',
    name: 'login',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło',
    type: 'password',
    name: 'password',
  },
];

export const resetReqInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę użytkownika',
    type: 'text',
    name: 'login',
  },
  {
    id: uuidv4(),
    icon: 'mail',
    label: 'Email',
    placeholder: 'Podaj email',
    type: 'email',
    name: 'email',
  },
];

export const resetInputs = [
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło',
    type: 'password',
    name: 'password',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Powtórz Hasło',
    placeholder: 'Powtórz hasło',
    type: 'password',
    name: 'passwordConfirm',
  },
];

export const changePassInputs = [
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Obowiązujące hasło',
    placeholder: 'Podaj obowiązujące hasło',
    type: 'password',
    name: 'oldPassword',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Nowe hasło',
    placeholder: 'Podaj nowe hasło',
    type: 'password',
    name: 'password',
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Powtórz nowe hasło',
    placeholder: 'Powtórz nowe hasło',
    type: 'password',
    name: 'passwordConfirm',
  },
];

export const accordionsVIIa = [
  {
    id: uuidv4(),
    checkeboxName: 'isTab1a',
    label:
      'Udział w konkursie przedmiotowym /olimpiadzie przedmiotowej i uzyskanie tytułu laureata lub finalisty',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1b',
    label: 'Wykonanie pracy badawczej',
    areaName: 'tab1b_desc',
    placeholder: 'Wpisz temat pracy badawczej (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1c',
    label: 'Przygotowanie referatu lub prezentacji',
    areaName: 'tab1c_desc',
    placeholder: 'Wpisz temat referatu lub prezentacji (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1d',
    label: 'Przygotowanie publikacji',
    areaName: 'tab1d_desc',
    placeholder: 'Wpisz temat publikacji (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1e',
    label: 'Przygotowanie wystawy',
    areaName: 'tab1e_desc',
    placeholder: 'Wpisz temat wystawy (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1f',
    label:
      'Stworzenie filmu o tematyce dotyczącej wybranego przedmiotu kierunkowego',
    areaName: 'tab1f_desc',
    placeholder: 'Opisz planowany film (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1g',
    label: 'Stworzenie programu komputerowego / aplikacji ',
    areaName: 'tab1g_desc',
    placeholder: 'Opisz czego dotyczć będzie program komputerowy / aplikacja (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1h',
    label: 'Uzyskanie certyfikatu językowego',
    areaName: 'tab1h_desc',
    placeholder: 'Wpisz planowany poziom certyfikatu (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1i',
    label:
      'Otrzymanie oceny co najmniej bardzo dobrej na koniec roku szkolnego 2020/2021',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1j',
    label: 'Stworzenie własnej strony internetowej',
    areaName: 'tab1j_desc',
    placeholder: 'Opisz czego dotyczytć będzie strona internetowa (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab1k',
    label: 'Inny rezultat',
    areaName: 'tab1k_desc',
    placeholder:
      'Opisz czego dotyczyć będzie inny rezultat i jak zostanie osiągnięty (co najmniej 10 znaków)',
  },
];

export const accordionsVIIb = [
  {
    id: uuidv4(),
    checkeboxName: 'isTab2a',
    label:
      'Udział w konkursie przedmiotowym /olimpiadzie przedmiotowej i uzyskanie tytułu laureata lub finalisty (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2b',
    label: 'Wykonanie pracy badawczej',
    areaName: 'tab2b_desc',
    placeholder: 'Wpisz temat pracy badawczej (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2c',
    label: 'Przygotowanie referatu lub prezentacji',
    areaName: 'tab2c_desc',
    placeholder: 'Wpisz temat referatu lub prezentacji (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2d',
    label: 'Przygotowanie publikacji',
    areaName: 'tab2d_desc',
    placeholder: 'Wpisz temat publikacji (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2e',
    label: 'Przygotowanie wystawy',
    areaName: 'tab2e_desc',
    placeholder: 'Wpisz temat wystawy (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2f',
    label:
      'Stworzenie filmu o tematyce dotyczącej wybranego przedmiotu kierunkowego',
    areaName: 'tab2f_desc',
    placeholder: 'Opisz planowany film (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2g',
    label: 'Stworzenie programu komputerowego / aplikacji ',
    areaName: 'tab2g_desc',
    placeholder:
      'Opisz czego dotyczć będzie program komputerowy / aplikacja (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2h',
    label: 'Uzyskanie certyfikatu językowego',
    areaName: 'tab2h_desc',
    placeholder: 'Wpisz planowany poziom certyfikatu (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2i',
    label:
      'Otrzymanie oceny co najmniej bardzo dobrej na koniec roku szkolnego 2020/2022',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2j',
    label: 'Stworzenie własnej strony internetowej',
    areaName: 'tab2j_desc',
    placeholder:
      'Opisz czego dotyczytć będzie strona internetowa (co najmniej 10 znaków)',
  },
  {
    id: uuidv4(),
    checkeboxName: 'isTab2k',
    label: 'Inny rezultat',
    areaName: 'tab2k_desc',
    placeholder:
      'Opisz czego dotyczyć będzie inny rezultat i jak zostanie osiągnięty (co najmniej 10 znaków)',
  },
];
