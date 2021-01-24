import { v4 as uuidv4 } from 'uuid';

export const registerInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę użytkownika',
    type: 'text',
    name: 'login'
  },
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Imię',
    placeholder: 'Podaj imię użytkownika',
    type: 'text',
    name: 'firstName'
  },
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwisko',
    placeholder: 'Podaj nazwisko użytkownika',
    type: 'text',
    name: 'lastName'
  },
  {
    id: uuidv4(),
    icon: 'mail',
    label: 'Email',
    placeholder: 'Podaj email użytkownika',
    type: 'email',
    name: 'email'
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło',
    type: 'password',
    name: 'password'
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Powtórz hasło',
    placeholder: 'Powtórz hasło',
    type: 'password',
    name: 'passwordConfirm'
  },
];


export const loginInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę użytkownika',
    type: 'text',
    name: 'login'
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło',
    type: 'password',
    name: 'password'
  }]

export const resetReqInputs = [
  {
    id: uuidv4(),
    icon: 'user',
    label: 'Nazwa użytkownika',
    placeholder: 'Podaj nazwę użytkownika',
    type: 'text',
    name: 'login'
  },
  {
    id: uuidv4(),
    icon: 'mail',
    label: 'Email',
    placeholder: 'Podaj email',
    type: 'email',
    name: 'email'
  }]


export const resetInputs = [

  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Hasło',
    placeholder: 'Podaj hasło',
    type: 'password',
    name: 'password'
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
    name: 'oldPassword'
  },
  {
    id: uuidv4(),
    icon: 'lock',
    label: 'Nowe hasło',
    placeholder: 'Podaj nowe hasło',
    type: 'password',
    name: 'password'
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