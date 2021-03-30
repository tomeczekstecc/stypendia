export const mapLink = (error) => {
  const errors = [
    [
      'Należy wybrać status Wnioskodawcy',

      'Email wnioskodawcy musi mieć poprawny format',
      'Imię ucznia musi zawierać od 2 do 254 znaków',
      'Nazwisko ucznia musi zawierać od 2 do 254 znaków',
      'Pesel ucznia musi zawierać 11 znaków',

      'Numer telefonu ucznia musi mieć poprawny format (dozwolone cyfty,"+" oraz "-", od 9 do 15 znaków)',
      'Email ucznia musi mieć poprawny format',

      'Numer telefonu wnioskodawcy musi mieć poprawny format (dozwolone cyfty,"+" oraz "-", od 9 do 15 znaków)',
    ],

    [
      'Nazwa szkoły ucznia musi zawierać od 2 do 254 znaków',
      'Ulica szkoły ucznia musi zawierać od 2 do 254 znaków',
      'Numer budynku szkoły ucznia musi zawierać od 1 do 254 znaków',
      'Miejscowość szkoły ucznia musi zawierać od 2 do 254 znaków',
      'Kod pocztowy należy podać w formacie: XX-XXX',
      'Należy podać jedno z województw',
      'Należy wskazać liceum lub technikum',
      'Imię opiekuna dydaktycznego ucznia musi zawierać od 2 do 254 znaków',
      'Nazwisko opiekuna dydaktycznego ucznia musi zawierać od 2 do 254 znaków',
      'Należy wybrać profil opiekuna dydaktycznego ucznia',
    ],

    [
      'Należy wybrać ocenę dla matematyki',
      'Należy wskazać język obcy (od 2 do 254 znaków)',
      'Należy wybrać ocenę dla języka obcego',
      'Należy wskazać inny przedmiot  (od 2 do 254 znaków)',
      'Należy wybrać ocenę dla innego przedmiotu',
      'Średnia przedmiotów kierunkowych musi wynosić co najmniej 5.33',
      'Należy wybrać średnią wszystkich ocen',
      'Należy wybrać odpowiedź, czy uczeń/uczennica uzyskał/a tytuł finalisty',
      'Należy wybrać odpowiedź, czy uczeń/uczennica posiada zgodę',
      'Należy wybrać odpowiedź dot. niepełnosprawności',
    ],
    [
      'Należy wskazać przedmiot (lista z części V)',
      'Pole dot. pracy badawczej musi zawierać co najmniej 10 znaków',
      'Pole dot. referatu/prezentacji musi zawierać co najmniej 10 znaków',
      'Pole dot. publikacji musi zawierać co najmniej 10 znaków',
      'Pole dot. wystawy musi zawierać co najmniej 10 znaków',
      'Pole dot. filmu musi zawierać co najmniej 10 znaków',
      'Pole dot. programu komputerowego/aplikacji musi zawierać co najmniej 10 znaków',
      'Pole dot. certyfikatu musi zawierać co najmniej 10 znaków',
      'Pole dot. strony internetowej musi zawierać co najmniej 10 znaków',
      'Pole dot. innych rezultatów musi zawierać co najmniej 10 znaków',
      'Liczba wybranych rezultatów w tabeli 1 musi wynosić dokładnie 3',
    ],

    [
      'Należy wybrać przedmiot kluczowy',
      'Należy wpisać nazwę wybranego przedmiotu kluczowego',
      'Pole dot.pracy badawczej musi zawierać co najmniej 10 znaków ',
      'Pole dot. referatu/prezentacji musi zawierać co najmniej 10 znaków ',
      'Pole dot. publikacji musi zawierać co najmniej 10 znaków ',
      'Pole dot. wystawy musi zawierać co najmniej 10 znaków ',
      'Pole dot. filmu musi zawierać co najmniej 10 znaków ',
      'Pole dot. programu komputerowego/aplikacji musi zawierać co najmniej 10 znaków ',
      'Pole dot. certyfikatu musi zawierać co najmniej 10 znaków ',
      'Pole dot. strony internetowej musi zawierać co najmniej 10 znaków ',
      'Pole dot. innych rezultatów musi zawierać co najmniej 10 znaków ',
      'Liczba wybranych rezultatów w tabeli 2 musi wynosić dokładnie 3',
    ],
    [
      'Wartość całkowita planu wydatków nie może być mniejsza niż 5 000,00 PLN',
      'Wartość całkowita planu wydatków nie może być mniejsza lub równa zeru i przewyższać 5 000 PLN',
      'Pole uzasadnienia w części A. musi zawierać co najmniej 10 znaków',
      'Pole uzasadnienia w części B. musi zawierać co najmniej 10 znaków',
    ],
    [
      'Należy zapoznać się z treścią oświadczeń i informacji oraz potwierdzić zapoznanie się z nimi',
    ],
  ];

  if (errors[0].includes(error)) return 1;
  if (errors[1].includes(error)) return 2;
  if (errors[2].includes(error)) return 3;
  if (errors[3].includes(error)) return 4;
  if (errors[4].includes(error)) return 5;
  if (errors[5].includes(error)) return 6;
  if (errors[6].includes(error)) return 8;
  return 7;
};
