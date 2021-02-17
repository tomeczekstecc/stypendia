export const msg = {
  _500:
    'Coś poszło nie tak - jeżeli problem będzie się powtarzał skontaktuj się z administratorem',
  client: {
    fail: {
      passChange: 'Nieudana zmiana hasła',
      empty: 'Pole nie może być puste',
      passMustDiff: 'Obowiązujące i nowe hasło muszą się różnić',
      passNoDiff: 'Hasła muszą być zgodne',
      logInFailed: 'Nieudana próba logowania',
      noUser: 'Nie znaleziono użytkownika',
      wrongAttType: 'Nieprawidłowty typ załącznika',
      attToBig: 'Nieprawidłowa wielkość pliku - plik nie może przekroczyć 20MB',
      attCreated: 'Pomyślnie utworzono załącznik',
      emailErr: 'Musisz podać poprawny adres email',
      userErr: 'Musisz podać poprawną nazwę użytkownika',
      linkNoSend: 'Nie udało się wysłać linka',
      invalidToken:
        'Użyto nieprawidłowy token - może być uszkodzony lub przestarzały',
      peselExists: 'Ten pesel został już wykorzystany',
      unvalidated: 'Wprowadzone dane nie spełniły warunków walidacji',
      noUserNoSubmit: 'Nie znaleziono uzytkownika lub wniosku',
      emailTaken: 'Ten email jest już zajęty',
      loginTaken: 'Ten login jest już zajęty',
      loginOrEmailTaken: 'Ten login lub email są już zajęte',
      wrongCreds:
        'Wprowadzono niepoprawne dane lub użytkownik nie potwierdził konta',

      stillBlocked:
        'Użytkownik jest zablokowany - spróbuj po za 20 minut. Jeżeli nie odzyskasz prawidłowego hasła - spróbuj je zresetować',
      nextBlock:
        'Kolejna nieudana próba zablokuje użytkownika i uniemożliwi dalsze logowania na 20 minut',
      blocked:
        'Odnotowano zbyt dużą liczbe nieudanych logowań. Użytkownik został zablokowany na 20 minut',
      forcedChangePass:
        'Od ostatniej zmiany hasła minęło 90 dni. Należy je zmienić',
      confirmToolate:
        'Nie możemy już potwierdzić konta - ponownie wyślij emaila weryfikującego konto',
      alreadyConfirmed: 'Użytkownik był już potwierdzony',
      noFile: 'Niestety nie udało się znalźć pliku',
      mime: 'Niedozwolony typ pliku. Dozwolone pliki: .JPG, .PNG, .PDF',
      delUser: 'Nie możemy usunąć Twojego konta jeżeli masz aktywne wnioski',
      noStatement:
        'Nie dodano załącznika - oświadczenia opiekuna dydaktytcznego',
      noReportCard: 'Nie dodano załącznika - świadectwa szkolnego',
      noRandoms:
        'Nie dodano żadnego załącznika potwierdzającego tytuł laureta/finalisty',
      unnecRandoms:
        'Dodano załącznik potwierdzający tytuł laureata/finalisty, ale w części VI zaznaczono NIE przy pytaniu pierwszym',
      noAllowance: 'Nie dodano załącznika ze zgodą na indywidualny tryb nauki',
      unnecAllowance:
        'Dodano załącznik ze zgodą na indywidualny tryb nauki, ale w części VI zaznzczono NIE przy pytaniu drugim',
      noAttestation: 'Nie dodano załącznika z orzeczeniem o niepełnosprawności',
      unnecAttestation:
        'Dodano załącznik z orzeczeniem o niepełnosprawności, ale w częścii VI zaznaczono NIE przy pytaniu trzecim',
            },
                ok: {
      passChange: 'Udało się zmienić hasło',
      draftSucceed: 'Pomyślnie utworzono wniosek roboczy',
      subUpdated: 'Pomyślnie zaktualizowano wniosek',
      draftsFetched: 'Pomyślnie pobrano informacje o kopiach roboczych',
      fileFetched: 'Udało się pobrać plik',
      fileDel: 'Pomyślnie usunięto plik',
      pdfCreated: 'Pomyślnie wygenerowano plik pdf',
      pdfFetched: 'Pomyślnie pobrano plik pdf',
      linkSend: 'Wysłano mail z linkiem do odzyskania hasła na adres: ',
      subCreated: 'Pomyślnie utworzono wniosek',
      subsFetched: 'Pomyślnie pobrano informacje o wnioskach',
      subFetched: 'Pomyślnie pobrano informacje o wniosku',
      historyCreated: 'Utworzono wpis w historii wniosku',
      historyUserCreated: 'Utworzono wpis w historii wużytkownika',
      historiesFethed: 'Pobrano wszystkie wpisy w historii wniosku',
      userCreated: 'Pomyślnie utworzono użytkownika',
      loggedIn: 'Pomyślnie zalogowano użytkownika',
      loggedOut: 'Pomyślnie wylogowano użytkownika',
      confirmed: 'Udało się potwierdzić konto',
    },
  },
  subjects: {
    resetPass: 'Zresetuj hasło',
  },
  dev: {
    usersFetched: 'Pomyślnie pobrano dane o użytkownikach',
    noUser: 'Nie znaleziono uzytkownika',
    userFetched: 'Pomyślnie pobrano dane użytkownika',
    userUpdated: 'Pomyślnie zaktualizowano dane użytkownika',
    userDeleted: 'Pomyślnie usunięto użytkownika',
    passNoMatch: ' - admin msg: niepasujace hasła.',
    delUser: ' - admin msg: liczba wnisosków o statusie większym niż 1: ',
    unoUserOrUserNotVer:
      ' - admin msg: użytkownik nie istnieje, lub konto niejest potwierdzone.',

    userRemovedOrBanned:
      ' - admin msg: użytkownik jest usnięty lub zastrzeżony lub zablokowany (isBanned lub isRemoved lub isBlocked)',
  },
};
