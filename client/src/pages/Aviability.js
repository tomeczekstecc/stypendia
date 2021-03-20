import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Wrapper } from './styles/aviability.styles';
import { useHistory } from 'react-router-dom';

const Aviability = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <div className='avibilityPage'></div>
      <Header as='h2' attached='top'>
        Deklaracja dostępności
      </Header>
      <Segment textAlign='left' attached>
        <article>


              <p id='a11y-wstep'>
                <span id='a11y-podmiot'>
                  <strong>Urząd Marszałkowski Województwa Śląskiego</strong>{' '}
                  zobowiązuje się zapewnić dostępność swojej strony internetowej
                  zgodnie z przepisami ustawy z dnia 4 kwietnia 2019 r. o
                  dostępności cyfrowej stron internetowych i aplikacji mobilnych
                  podmiotów publicznych. Oświadczenie w sprawie dostępności ma
                  zastosowanie do strony internetowej{' '}
                  <a
                    href='https://slaskie.pl'
                    title='strona internetowa Województwa Śląskiego'
                    id='a11y-url'
                  >
                    <strong>Województwa Śląskiego</strong>.{' '}
                  </a>
                </span>
              </p>
              <p>
                Data publikacji strony internetowej:{' '}
                <span id='a11y-data-publikacja'>2000-01-01</span>
              </p>
              <p>
                Data ostatniej istotnej aktualizacji:{' '}
                <span id='a11y-data-aktualizacja'>2020-09-22</span>
              </p>
              <p id='a11y-status'>
                Strona internetowa jest <strong>częściowo zgodna</strong> z
                ustawą z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron
                internetowych i aplikacji mobilnych podmiotów publicznych z
                powodu niezgodności lub wyłączeń takich jak:
              </p>
              <ul>
                <li>
                  Na stronie internetowej występują niepełne opisy alternatywne
                  elementów nietekstowych.
                </li>
              </ul>
              <p>
                Ze strony internetowej można korzystać przy pomocy klawisza TAB
                na klawiaturze (oraz strzałek i spacji w przypadku menu).
              </p>
              <p>
                Oświadczenie sporządzono dnia:{' '}
                <span id='a11y-data-sporzadzenie'>2020-09-22</span>.
              </p>
              <p>
                Deklarację sporządzono na podstawie samooceny przeprowadzonej
                przez podmiot publiczny.
              </p>
              <h3 id='a11y-kontakt'>
                <br />
                Informacje zwrotne i dane kontaktowe
              </h3>
              <p>
                W przypadku problemów z dostępnością strony internetowej prosimy
                o kontakt. Osobą odpowiedzialną jest Pan{' '}
                <span id='a11y-osoba'>Tomasz Żak</span>, e-mail:{' '}
                <span id='a11y-email'>
                  <a href='mailto:tomasz.zak@slaskie.pl'>
                    tomasz.zak@slaskie.pl
                  </a>
                </span>
                . Kontaktować można się także dzwoniąc na numer telefonu{' '}
                <span id='a11y-telefon'>+48 (32) 20 78 390</span>. Tą samą drogą
                można składać wnioski o udostępnienie informacji niedostępnej
                oraz składać skargi na brak zapewnienia dostępności.
              </p>
              <p id='a11y-procedura'>
                Każdy ma prawo do wystąpienia z żądaniem zapewnienia dostępności
                cyfrowej strony internetowej lub jakiegoś jej elementu.
                <br /> Można także zażądać udostępnienia informacji za pomocą
                alternatywnego sposobu dostępu, na przykład przez odczytanie
                niedostępnego cyfrowo dokumentu, opisanie zawartości filmu bez
                audiodeskrypcji itp.
                <br /> Żądanie powinno zawierać dane osoby zgłaszającej żądanie,
                wskazanie, o którą stronę internetową chodzi oraz sposób
                kontaktu.
                <br /> Jeżeli osoba żądająca zgłasza potrzebę otrzymania
                informacji za pomocą alternatywnego sposobu dostępu, powinna
                także określić dogodny dla niej sposób przedstawienia tej
                informacji.
                <br /> Urząd Marszałkowski Województwa Śląskiego powinien
                zrealizować żądanie niezwłocznie, nie później niż w ciągu 7 dni
                od dnia wystąpienia z żądaniem. Jeżeli dotrzymanie tego terminu
                nie jest możliwe, Urząd Marszałkowski Województwa Śląskiego
                niezwłocznie informuje o tym wnoszącego żądanie, kiedy
                realizacja żądania będzie możliwa, przy czym termin ten nie może
                być dłuższy niż 2 miesiące od dnia wystąpienia z żądaniem.
                <br /> Jeżeli zapewnienie dostępności cyfrowej nie jest możliwe,
                Urząd Marszałkowski Województwa Śląskiego może zaproponować
                alternatywny sposób dostępu do informacji.
                <br /> W przypadku, gdy Urząd Marszałkowski Województwa
                Śląskiego odmówi realizacji żądania zapewnienia dostępności lub
                alternatywnego sposobu dostępu do informacji, wnoszący żądanie
                możne złożyć skargę w sprawie zapewniana dostępności cyfrowej
                strony internetowej lub elementu strony internetowej.
                <br /> Po wyczerpaniu wskazanej wyżej procedury można także
                złożyć wniosek do{' '}
                <a
                  href='https://www.rpo.gov.pl/content/jak-zglosic-sie-do-rzecznika-praw-obywatelskich'
                  title='Rzecznik Praw Obywatelskich - otwarcie w nowym oknie'
                  target='blank'
                >
                  Rzecznika Praw Obywatelskich.{' '}
                </a>
              </p>

              <h3 id='a11y-architektura'>
                <br /> Dostępność architektoniczna
              </h3>
              <p>
                Urząd Marszałkowski Województwa Śląskiego mieści się w
                następujących lokalizacjach:
              </p>
              <ul>
                <li>
                  Katowice, ul. Ligonia 46 - <strong>siedziba główna</strong>, w
                  której znajduje się Kancelaria ogólna (pok. 164),
                </li>
                <li>Katowice, ul. Dąbrowskiego 23,</li>
                <li>Katowice, ul. Lompy 14,</li>
                <li>Katowice, ul. Plebiscytowa 36,</li>
                <li>Katowice, ul. Powstańców 34,</li>
                <li>Katowice, ul. Reymonta 24,</li>
                <li>Bielsko-Biała, ul. Piastowska 40,</li>
                <li>Częstochowa, ul. Sobieskiego 7.</li>
              </ul>
              <p>
                Do budynków można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>
              <p id='totupoint'>
                W budynkach mieszczących się na{' '}
                <strong>
                  ul. Ligonia 46, ul. Dąbrowskiego 23 oraz ul. Reymonta 24
                </strong>{' '}
                znajdują się znaczniki służące do udźwiękowiania przestrzeni
                publicznej, które mają za zadanie informować osoby ze
                szczególnymi potrzebami np. osoby z niepełnosprawnością wzroku
                (niewidome, ociemniałe lub słabowidzące) o aktualnym stanie
                przestrzeni publicznej, w której się znajdują. Aby skorzystać z
                systemu znaczników konieczne jest zainstalowanie darmowej
                aplikacji <strong>TOTUPOINT</strong> na urządzeniu mobilnym (np.
                smartfonie) oraz <strong>włączenie bluetooth</strong>. Aplikację
                można pobać ze sklepu{' '}
                <a
                  href='https://apps.apple.com/pl/app/totupoint/id917319251'
                  title='Aplikacja TOTUPOINT w sklepie App Store - otwarcie w nowym oknie'
                  target='blank'
                >
                  App Store
                </a>{' '}
                bądź sklepu{' '}
                <a
                  href='https://play.google.com/store/apps/details?id=pl.pirslab.totupoint'
                  title='Aplikacja TOTUPOINT w sklepie Google Play - otwarcie w nowym oknie'
                  target='blank'
                >
                  Google Play.
                </a>{' '}
                Znajdując się w zasięgu znacznika zostaje on aktywowany i
                zostanie odczytany komunikat przez urządzenie TOTUPOINT, a w
                aplikacji zostanie wyświetlony bardziej szczegółowy opis tego
                znacznika. Znaczniki zostały zamontowane w kluczowych punktach
                m.in. wejścia do budynków, toalety i najważniejsze miejsca w
                budynkach.
              </p>
              <p>
                W związku z działaniami podejmowanymi na terenie kraju celem
                przeciwdziałania rozprzestrzeniania się wirusa SARS-Cov-2 oraz{' '}
                <strong>w trosce o zdrowie mieszkańców</strong> zawiadamia się o{' '}
                <a
                  href='https://www.slaskie.pl/content/wazne-informacje-dla-klientow-urzedu'
                  title='Ważne informacje dla klientów dot. ograniczenia dostępności Urzędu Marszałkowskiego w związku z sytuacją epidemiologiczną'
                >
                  tymczasowym ograniczeniu dostępności Urzędu Marszałkowskiego
                  dla klientów.{' '}
                </a>
              </p>
              <h4>
                <br /> Siedziba główna: ul. Ligonia 46, 40-037 Katowice
              </h4>
              <p>Budynek posiada cztery wejścia:</p>
              <ul>
                <li>od strony ul. Ligonia,</li>
                <li>od strony ul. Jagiellońskiej,</li>
                <li>od strony ul. Lompy,</li>
                <li>
                  od strony ul. Reymonta - dostosowane dla potrzeb osób z
                  niepełnosprawnościami.
                </li>
              </ul>
              <p>
                W budynku znajdują się znaczniki{' '}
                <a href='#totupoint'>TOTUPOINT</a> służące do udźwiękowiania
                przestrzeni publicznej{' '}
                <a
                  href='http://www.totupoint.pl/strona.php?nazwa=lista_znacznikow_totupoint&amp;miasto=Katowice&amp;miejsce=Urz%C4%85d+Marsza%C5%82kowski+Wojew%C3%B3dztwa+%C5%9Al%C4%85skiego+Ligonia+46'
                  title='lista znaczników w lokalizacji: Katowice, ul. Ligonia 46 - otwarcie w nowym oknie'
                  target='blank'
                >
                  {' '}
                  (10 znaczników).{' '}
                </a>
              </p>
              <p>
                Dostosowanie dla osób niepełnosprawnych posiada jedynie wejście
                do budynku od ul. Reymonta (możliwość wjazdu dla osób na
                wózkach). Przy tym wejściu znajduje się winda, którą można się
                przemieścić na wszystkie kondygnacje budynku, do wszystkich
                stref obsługi klienta, w tym do Biura Obsługi Klienta. Osoba
                niepełnosprawna, w tym na wózku, ma możliwość przejścia przez
                obszary kontroli w godzinach pracy urzędu. Po godzinach pracy
                dostęp do wind i kondygnacji innych niż parter jest
                zabezpieczony za pomocą drzwi automatycznych otwieranych za
                pomocą karty zbliżeniowej, którą posiadają osoby pracujące w
                budynku. Z asystą ochrony osoby niepełnosprawne mogą, w
                uzasadnionych przypadkach, poruszać się po budynku również poza
                godzinami pracy.
              </p>
              <p>
                Budynek jest wyposażony w 5 wind (w tym 4 dostępne dla osób
                niepełnosprawnych), którymi można się przemieścić na wszystkie
                kondygnacje budynku. Na poziomie sutereny i parteru znajdują się
                strefy, które z uwagi na schody są częściowo niedostępne dla
                osób na wózkach. Cały budynek posiada oznakowanie o kierunku
                wyjścia z budynku. Wszystkie toalety dla osób niepełnosprawnych
                są oznakowane (tabliczki na drzwiach toalet). Na korytarzach
                znajdują się tabliczki wskazujące kierunek do toalet dla osób
                niepełnosprawnych (toalety te znajdują się na parterze oraz 2. i
                3. piętrze i są dostępne dla osób na wózkach).
              </p>
              <p>
                Wszystkie windy (z wyjątkiem zabytkowej windy paciorkowej)
                wyposażone są w system dźwiękowy informujący o zamykaniu drzwi
                oraz numerze piętra, komunikaty głosowe są dobrze słyszalne,
                wszystkie panele posiadają informację w alfabecie Braille'a,
                przycisk Zero jest odznaczony kolorem, wszystkie windy posiadają
                wyświetlacz pokazujący numer piętra, dodatkowo we wszystkich
                windach zainstalowane są kamery podłączone do systemu
                monitoringu budynku.
              </p>
              <p>
                Na dziedzińcu wewnętrznym Urzędu dostępnym od ul. Reymonta jest
                wyznaczone 1 miejsce parkingowe dla osób niepełnosprawnych. W
                okolicy budynku są wyznaczone miejsca dla osób
                niepełnosprawnych, jednakże znajdują się one poza terenem
                należącym do Urzędu i są administrowane przez Miasto Katowice.
              </p>
              <p>
                W przypadku pojawienia się w Urzędzie osoby niepełnosprawnej,
                zwykle otrzymuje ona asystę ochrony. Do budynku można wejść z
                psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>

              <h4>
                <br /> Lokalizacja: ul. Dąbrowskiego 23, Katowice
              </h4>
              <p>
                Budynek posiada dwa wejścia dla osób niepełnosprawnych
                poruszających się na wózkach inwalidzkich:
              </p>
              <ul>
                <li>
                  wejście główne od strony Placu Chrobrego, obecnie{' '}
                  <u>zamknięte</u> z powodu złego stanu elewacji budynku i
                  wygrodzenia terenu wokół budynku,
                </li>
                <li>
                  wejście drugie prowadzące przez część parkingu na parterze.
                </li>
              </ul>
              <p>
                W budynku znajdują się znaczniki{' '}
                <a href='#totupoint'>TOTUPOINT</a> służące do udźwiękowiania
                przestrzeni publicznej{' '}
                <a
                  href='http://www.totupoint.pl/strona.php?nazwa=lista_znacznikow_totupoint&amp;miasto=Katowice&amp;miejsce=Urz%C4%85d+Marsza%C5%82kowski+Wojew%C3%B3dztwa+%C5%9Al%C4%85skiego+D%C4%85browskiego+23'
                  title='lista znaczników w lokalizacji: Katowice, ul. Dąbrowskiego 23 - otwarcie w nowym oknie'
                  target='blank'
                >
                  (6 znaczników).{' '}
                </a>
              </p>
              <p>
                Na parkingu przynależącym do budynku wyznaczono miejsce
                parkingowe dla osób niepełnosprawnych.
              </p>
              <p>
                Dla osób na wózkach dostępna jest platforma przychodowa
                znajdująca się na parterze budynku. Korzystając z drogi od ul.
                Dąbrowskiego do dyspozycji jest sygnał dźwiękowy, informujący
                pracownika ochrony oraz druga platforma przychodowa. Obsługa
                administracji dodatkowo wyposażona jest w przenośne podesty
                umożliwiające zjazd wózka ze schodów.
              </p>
              <p>
                W punkcie informacyjnym oraz na Sali Kolumnowej znajduje się
                pętla indukcyjna.
              </p>
              <p>
                Budynek wyposażony jest w toalety dla osób niepełnosprawnych. W
                budynku nie ma oznaczeń w alfabecie Braille'a.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>

              <h4>
                <br /> Lokalizacja: ul. Lompy 14, Katowice
              </h4>
              <p>
                Wejście dla osób niepełnosprawnych znajduje się od strony ul.
                Lompy, tuż obok wejścia głównego do budynku. Wyposażone jest w
                dzwonek przywołujący w razie potrzeby pracownika ochrony.
              </p>
              <p>
                W budynku znajdują się trzy windy, z czego największa
                przystosowana do przewozu wózków inwalidzkich, wyposażona jest w
                system informacji dźwiękowej oraz oznaczenia w języku Braille'a.
              </p>
              <p>
                Na parterze budynku znajduje się toaleta dla osób ze
                szczególnymi potrzebami oznaczona stosownymi tabliczkami.
              </p>
              <p>
                Przed budynkiem znajduje się 1 miejsce parkingowe zarezerwowane
                dla osób niepełnosprawnych.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>

              <h4 >
                <br /> Lokalizacja: ul. Plebiscytowa 36, Katowice
              </h4>
              <p>
                Główne wejście do budynku znajduje się na rogu ulic Powstańców i
                Plebiscytowej. Dodatkowo 5. piętro ma połączenie z budynkiem
                sąsiadującym (ul. Powstańców 17) co stanowi dodatkowe wyjście
                ewakuacyjne. Do wejścia prowadzą schody. Budynek jest wyposażony
                w profesjonalny schodołaz przeznaczony do transportu osób
                poruszających się na wózku inwalidzkim oraz są wyznaczone osoby
                do asysty. Bezpośrednio za wejściem znajduje się portiernia.
              </p>
              <p>
                W budynku znajduje się winda, wszystkie korytarze i winda są
                przystosowane dla osób poruszających się na wózku. Każde piętro
                posiada dodatkową toaletę dla osób niepełnosprawnych. Winda
                posiada odpowiedniej szerokości wejścia, pozwala również na
                transport osoby na noszach.
              </p>
              <p>
                Budynek posiada 7 miejsc parkingowych, które są udostępniane w
                razie potrzeby. Dodatkowo w pobliżu znajdują się 2 miejsca
                parkingowe zarezerwowane dla osób niepełnosprawnych.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>

              <h4 >
                <br /> Lokalizacja: ul. Powstańców 34, Katowice
              </h4>
              <p>Budynek posiada dwa wejścia:</p>
              <ul>
                <li>
                  wejście frontowe od strony ul. Powstańców 34 nie ma przeszkód
                  architektonicznych,
                </li>
                <li>
                  wejście od strony parkingu posiadające dwa stopnie, w razie
                  potrzeby używany jest podjazd składany FEAL F150.
                </li>
              </ul>
              <p>
                Budynek wyposażony jest w windę OTIS Gen2 dostosowaną do
                transportu osób niepełnosprawnych, tj. udźwig 630 kg, drzwi o
                szerokości 90 cm, wymiary wewnętrzne 1,10 m na 1,40 m,
                komunikaty głosowe i oznaczenia pięter alfabetem Braille’a.
                Korytarze o szerokościach powyżej 1,20 m.
              </p>
              <p>
                Budynek nie ma miejsc parkingowych dla Klientów urzędu. Miejsce
                dla osób niepełnosprawnych znajduje się na ulicy po
                przeciwległej stronie jezdni.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>
              <h4>
                <br /> Lokalizacja: ul. Reymonta 24, Katowice
              </h4>
              <p>Do budynku prowadzą dwa wejścia:</p>
              <ul>
                <li>od strony ul. Reymonta,</li>
                <li>od strony podwórza budynku.</li>
              </ul>
              <p>
                W budynku znajdują się znaczniki{' '}
                <a href='#totupoint'>TOTUPOINT</a> służące do udźwiękowiania
                przestrzeni publicznej{' '}
                <a
                  href='http://www.totupoint.pl/strona.php?nazwa=lista_znacznikow_totupoint&amp;miasto=Katowice&amp;miejsce=Urz%C4%85d+Marsza%C5%82kowski+Wojew%C3%B3dztwa+%C5%9Al%C4%85skiego+Reymonta+24'
                  title='lista znaczników w lokalizacji: Katowice, ul. Reymonta 24 - otwarcie w nowym oknie'
                  target='blank'
                >
                  (4 znaczniki).{' '}
                </a>
              </p>
              <p>
                Do wejścia głównego prowadzą schody, brak podjazdu lub windy dla
                wózków. Recepcja znajduje się po prawej stronie od wejścia
                głównego. W budynku są dwie windy osobowe. Brak jest toalet dla
                osób niepełnosprawnych.
              </p>
              <p>
                W budynku nie ma oznaczeń w alfabecie Braille'a, ani oznaczeń
                kontrastowych lub w druku powiększonym dla osób niewidomych i
                słabowidzących.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>
              <h4>
                <br /> Lokalizacja: ul. Piastowska 40, Bielsko-Biała
              </h4>
              <p>Budynek posiada 3 wejścia:</p>
              <ul>
                <li>od strony ul. Asnyka (przewiązka),</li>
                <li>od strony ul. Mieszka I,</li>
                <li>
                  od strony parkingu przy ul. Asnyka na bocznej ścianie na
                  poziomie przyziemia – poziom (-1).
                </li>
              </ul>
              <p>
                Dostosowanie dla osób niepełnosprawnych posiada jedynie wejście
                do budynku od strony ul. Mieszka I (możliwość wjazdu dla osób na
                wózkach). Po wejściu do budynku i przejściu kilkunastu metrów
                można dojść do windy, która obsługuje poziomy od -1 (przyziemie)
                do 3. piętra.
              </p>
              <p>
                Budynek jest wyposażony w jedną windę dostępną dla osób
                niepełnosprawnych, którą można się poruszać po 5-ciu
                kondygnacjach budynku, tj. poziom -1 (przyziemia), parter, 1.
                piętro, 2. piętro, 3. piętro. Na poziom 4. piętra prowadzą
                schody klatki schodowej. Osoby niepełnosprawne mogą korzystać z
                ogólnodostępnych toalet znajdujących się na paterze oraz 1., 2.
                i 3. piętrze budynku.
              </p>
              <p>
                Winda wyposażona jest w system dźwiękowy informujący o zamykaniu
                drzwi, kierunku jazdy oraz numerze piętra. Komunikaty głosowe są
                dobrze słyszalne. Winda posiada wyświetlacz pokazujący numer
                piętra.
              </p>
              <p>
                Przed budynkiem na parkingu od strony ul. Mieszka I (w pobliżu
                wejścia do budynku przez przewiązkę) wyznaczone są 2 miejsca
                parkingowe dla osób niepełnosprawnych usytuowane na terenie
                Starostwa Powiatowego w Bielsku-Białej.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>
              <h4 >
                <br /> Lokalizacja: ul. Sobieskiego 7, Częstochowa
              </h4>
              <p>Do budynku prowadzą dwa wejścia:</p>
              <ul>
                <li>wejście główne od strony ul. Jana III Sobieskiego,</li>
                <li>wejście boczne z parkingu od strony ul. Korczaka.</li>
              </ul>
              <p>
                Do wejścia od strony ul. Korczaka prowadzą schody. Dostosowanie
                dla osób niepełnosprawnych posiada jedynie wejście do budynku od
                strony ul. Sobieskiego (możliwość wjazdu dla osób na wózkach).
                Wchodzenie do budynku odbywa się z poziomu chodnika. Dla gości
                przeznaczone jest wejście główne. Recepcja znajduje się na
                wprost drzwi wejścia głównego. Osoba na wózku inwalidzkim może
                przedostać się na hol głównej klatki schodowej za pomocą
                pochylni znajdującej się za recepcją.
              </p>
              <p>
                Dla osób na wózkach dostępne są tylko korytarze i pomieszczenia
                na parterze. Do części korytarza prowadzą schody, które można
                pokonać za pomocą platformy zainstalowanej w holu głównym.
                Platformę załącza pracownik recepcji (nieużywana platforma po
                określonym czasie ok. 5 minut przechodzi w stan spoczynku). W
                budynku nie ma windy. Cały budynek posiada oznakowanie o
                kierunku wyjścia z budynku. Toaleta dla osób niepełnosprawnych
                jest oznakowana (tabliczka na drzwiach toalety). Na korytarzach
                znajdują się tabliczki informujące o kierunku do toalety dla
                osób niepełnosprawnych. Toaleta dla osób niepełnosprawnych
                znajduje się na parterze, na końcu korytarza skrzydła od strony
                ul. Sobieskiego.
              </p>
              <p>
                W budynku nie ma pętli indukcyjnych. W budynku nie ma oznaczeń w
                alfabecie Braille'a, ani oznaczeń kontrastowych lub w druku
                powiększonym dla osób niewidomych i słabowidzących
              </p>
              <p>
                Przed budynkiem wyznaczono 1 miejsce parkingowe dla osób
                niepełnosprawnych od strony ul. Korczaka w strefie parkingów
                miejskich.
              </p>
              <p>
                Do budynku można wejść z psem asystującym i psem przewodnikiem.
              </p>
              <p>
                Istnieje również możliwość skorzystania z tłumacza języka
                migowego. Szczegółowa informacja znajduje się{' '}
                <a
                  href='https://www.sekap.pl/katalogstartk.seam?id=57172'
                  title='System Elektronicznej Komunikacji Administracji Publicznej - otwarcie w nowym oknie'
                  target='blank'
                >
                  na platformie SEKAP.{' '}
                </a>
              </p>
              <small class='date'>
                <small>2020-09-23</small>
              </small>



        </article>

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

export default Aviability;
