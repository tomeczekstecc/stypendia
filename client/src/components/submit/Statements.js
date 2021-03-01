import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, Header, Label } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { Wrapper } from '../styles/statements.styles';
import SubALayout from '../subALayout';
import { SubmitContext, AuthContext } from '../../context';
import Title from '../Title';

const Statements = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { resetTimeLeft } = authContext;

  const submitContext = useContext(SubmitContext);
  const {
    newSubmit,
    updateNewSubmit,
    submitMode,
    curSubmit,
    updateCurSubmit,
    submitToWatch,
    submitErrors,
    tempUuid,
  } = submitContext;
  submitMode === '' && history.push('/');
  const [curDocument, setCurDocument] = useState({});

  const handleOnChange = async (e) => {
    if (submitMode === 'watch') return;
    if (submitMode === 'edit') {
      await updateCurSubmit({
        ...curSubmit,
        tempUuid,
        [e.target.offsetParent.dataset.name]: !e.target.offsetParent.firstChild
          .checked,
      });
    } else if (submitMode === 'new') {
      await updateNewSubmit({
        ...newSubmit,
        tempUuid,
        [e.target.offsetParent.dataset.name]: !e.target.offsetParent.firstChild
          .checked,
      });
    }
  };

  useEffect(() => {
    resetTimeLeft();
    if (submitMode === 'new') {
      setCurDocument(newSubmit);
    } else if (submitMode === 'edit') {
      setCurDocument(curSubmit);
    } else if (submitMode === 'watch') {
      setCurDocument(submitToWatch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode, submitToWatch, newSubmit, curSubmit, curDocument]);

  return (
    <SubALayout>
      <Title content='Oświadczenia' />
      <Wrapper>
        <Header className='sub-header' floated='left' as='h4'>
          Oświadczenie rodzica/opiekuna prawnego niepełnoletniego ucznia /
          uczennicy lub pełnoletniego ucznia / uczennicy
        </Header>
        <br />
        <br />
        <div className='intro'>
          W związku z przystąpieniem do projektu pn. Śląskie. Inwestujemy w
          talenty – VI edycja:
        </div>

        <ol>
          <li>
            Oświadczam, iż:
            <ol type='a'>
              <li>
                uczeń / uczennica, o którym / której mowa we Wniosku o
                przyznanie stypendium, w okresie trwania zajęć
                dydaktyczno-wychowawczych w roku szkolnym 2020/2021, będzie
                realizować przedmiotowy Plan Rozwoju Ucznia, w tym przede
                wszystkim pracować na rzecz osiągnięcia założonych celów
                edukacyjnych i rezultatów w zakresie przedmiotów kierunkowych
                wskazanych we wniosku o przyznanie stypendium i przestrzegać
                przedłożonego planu wydatków.
              </li>
              <li>
                uczeń / uczennica, o którym / której mowa we Wniosku o
                przyznanie stypendium, w okresie trwania zajęć
                dydaktyczno-wychowawczych w roku szkolnym 2020/2021, będzie
                realizować przedmiotowy Plan Rozwoju Ucznia, w tym przede
                wszystkim pracować na rzecz osiągnięcia założonych celów
                edukacyjnych i rezultatów w zakresie przedmiotów kierunkowych
                wskazanych we wniosku o przyznanie stypendium i przestrzegać
                przedłożonego planu wydatków.
              </li>
            </ol>
          </li>
          <li>
            Zobowiązuję się do poinformowania Departamentu Europejskiego
            Funduszu Społecznego o zaprzestaniu sprawowania opieki dydaktycznej
            przez kandydata na opiekuna dydaktycznego lub opiekuna
            dydaktycznego,
          </li>
          <li>
            Oświadczam, że informacje zawarte w niniejszym wniosku są zgodne z
            prawdą.
          </li>
          <li>
            Oświadczam, że zapoznałem/am się ze wzorem umowy stypendialnej, a
            także pozostałą dokumentacją projektową
          </li>
          <li>
            Oświadczam, że zapoznałem/am się z Regulaminem przyznawania
            stypendiów w ramach projektu Śląskie. Inwestujemy w talenty - VI
            edycja realizowanego w ramach Regionalnego Programu Operacyjnego
            Województwa Śląskiego na lata 2014-2020 i akceptuję wszystkie jego
            postanowienia
          </li>
          <li>
            Oświadczam, iż posiadam oryginały dokumentów dołączonych do Wniosku
            i zobowiązuję się do ich przedstawienia na wezwanie Beneficjenta.
          </li>
          <li>
            Oświadczam, iż planowane w obrębie katalogów 2-4 wydatki nie są
            tożsame z już zakupionym sprzętem ze środków stypendialnych
            otrzymanych w ramach projektu „Śląskie. Inwestujemy w talenty – V
            edycja”, z wyłączeniem sytuacji w której ich planowany zakup został
            uzasadniony we wniosku.
          </li>
          <li>
            Oświadczam, iż informacje zawarte we wniosku i załącznikach są
            zgodne ze stanem faktycznym i jestem świadomy odpowiedzialności
            karnej dotyczącej składania nierzetelnych, pisemnych oświadczeń co
            do okoliczności o istotnym znaczeniu dla uzyskania wsparcia.
          </li>
          <li>
            Przyjmuję do wiadomości, iż:
            <ol type='a'>
              <li>
                Administratorem danych osobowych jest Zarząd Województwa
                Śląskiego, z siedzibą przy ul. Ligonia 46, 40-037 Katowice,
                adres email: kancelaria@slaskie.pl, strona internetowa:
                bip.slaskie.pl, www.slaskie.pl;
              </li>
              <li>
                Została wyznaczona osoba do kontaktu w sprawie przetwarzania
                danych osobowych (inspektor ochrony danych), adres email:
                daneosobowe@slaskie.pl;
              </li>
              <li>
                Moje dane osobowe, w związku ze złożeniem wniosku o przyznanie
                stypendium w ramach programu wspierania edukacji uzdolnionej
                młodzieży, będą przetwarzane w celu obsługi i realizacji
                projektu Śląskie. Inwestujemy w talenty – VI edycja, w tym:
                <ul>
                  <li>rekrutacji uczniów do projektu;</li>
                  <li>odpisywania umów cywilnoprawnych;</li>
                  <li>
                    organizacji przedsięwzięć dotyczących informacji i promocji
                    projektu (działania te mogą obejmować także upublicznianie
                    wizerunku);
                  </li>
                  <li>archiwizacji dokumentacji projektu.</li>
                </ul>
                Moje dane osobowe w przypadku zakwalifikowania (przyznania
                stypendium) do projektu dofinansowanego ze środków Regionalnego
                Programu Operacyjnego Województwa Śląskiego na lata 2014-2020
                (RPO WSL) będą przetwarzane także do celów:
                <ul>
                  <li> udzielenia wsparcia;</li>

                  <li> potwierdzenia kwalifikowalności wydatków;</li>
                  <li> monitoringu;</li>
                  <li> ewaluacji;</li>
                  <li> kontroli; </li>
                  <li> audytu prowadzonego przez upoważnione instytucje; </li>
                  <li> sprawozdawczości;</li>
                  <li> rozliczenia projektu;</li>
                  <li>
                    {' '}
                    odzyskiwania wypłaconych beneficjentowi środków
                    dofinansowania;{' '}
                  </li>
                  <li> zachowania trwałości projektu; </li>
                  <li> badań i analiz; </li>
                  <li>
                    {' '}
                    działania informacyjno-promocyjne w ramach RPO WSL
                    2014-2020;
                  </li>
                  <li>archiwizacji.</li>
                </ul>
                Podstawą prawną przetwarzania moich danych osobowych jest
                obowiązek prawny ciążący na administratorze (art. 6 ust. 1 lit.
                c oraz art. 9 ust. 2 lit. g Rozporządzenia Parlamentu
                Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
                sprawie ochrony osób fizycznych w związku z przetwarzaniem
                danych osobowych i w sprawie swobodnego przepływu takich danych
                oraz uchylenia dyrektywy 95/46/WE – dalej: RODO), wynikający z:
                <ul>
                  <li>
                    ustawy z dnia 11 lipca 2014 r. o zasadach realizacji
                    programów w zakresie polityki spójności finansowanych w
                    perspektywie finansowej 2014-2020 - w szczególności art. 6 i
                    9;
                  </li>
                  <li>
                    rozporządzenia Parlamentu Europejskiego i Rady (UE) nr
                    1303/2013 z dnia 17 grudnia 2013 r. ustanawiające wspólne
                    przepisy dotyczące Europejskiego Funduszu Rozwoju
                    Regionalnego, Europejskiego Funduszu Społecznego, Funduszu
                    Spójności, Europejskiego Funduszu Rolnego na rzecz Rozwoju
                    Obszarów Wiejskich oraz Europejskiego Funduszu Morskiego i
                    Rybackiego oraz ustanawiające przepisy ogólne dotyczące
                    Europejskiego Funduszu Rozwoju Regionalnego, Europejskiego
                    Funduszu Społecznego, Funduszu Spójności i Europejskiego
                    Funduszu Morskiego i Rybackiego oraz uchylające
                    rozporządzenie Rady (WE) nr 1083/2006 – w szczególności art.
                    125;
                  </li>
                  <li>
                    rozporządzenia Parlamentu Europejskiego i Rady (UE) nr
                    1304/2013 z dnia 17 grudnia 2013 r. w sprawie Europejskiego
                    Funduszu Społecznego i uchylające rozporządzenie Rady (WE)
                    nr 1081/2006 – w szczególności załącznik nr 1;
                  </li>
                  <li>
                    ustawy z dnia z dnia 5 czerwca 1998 r. o samorządzie
                    województwa – w szczególności art. 11;
                  </li>
                  <li>
                    ustawy z dnia 7 września 1991 r. o systemie oświaty – art.
                    90t.
                  </li>
                </ul>
              </li>
              <li>
                Moje dane osobowe będą ujawniane osobom upoważnionym przez
                administratora danych osobowych w związku z realizacją celów o
                których mowa w lit. c, podmiotom upoważnionym na podstawie
                przepisów prawa, dostawcom systemów informatycznych i usług IT,
                operatorowi pocztowemu lub kurierowi, podmiotom realizującym
                badania ewaluacyjne lub inne działania związane z realizacją
                Regionalnego Programu Operacyjnego Województwa Śląskiego na lata
                2014 - 2020 na zlecenie Instytucji Zarządzającej lub
                Beneficjenta w tym analiz, ekspertyz, ministrowi właściwemu do
                spraw rozwoju regionalnego, wykonawcom/organizatorom
                przedsięwzięć dotyczących informacji i promocji projektu,
                podmiotom realizującym archiwizację, stronom i innym uczestnikom
                postępowań administracyjnych. Ponadto w zakresie stanowiącym
                informację publiczną dane będą ujawniane każdemu
                zainteresowanemu taką informacją lub publikowane w BIP Urzędu
              </li>
              <li>
                Dane osobowe będą przechowywane do czasu zamknięcia Regionalnego
                Programu Operacyjnego Województwa Śląskiego na lata 2014-2020
                (art. 140 i 141 Rozporządzenia Parlamentu Europejskiego i Rady
                (UE) nr 1303/2013 dnia 17 grudnia 2013 r.) bez uszczerbku dla
                zasad regulujących pomoc publiczną oraz krajowych przepisów
                dotyczących archiwizacji dokumentów;
              </li>
              <li>
                Przysługuje mi prawo dostępu do treści swoich danych oraz prawo
                żądania ich sprostowania, usunięcia lub ograniczenia
                przetwarzania, prawo wniesienia skargi do Prezesa Urzędu Ochrony
                Danych Osobowych;
              </li>
              <li>
                Administrator danych osobowych, na mocy art. 17 ust. 3 lit. b
                RODO, ma prawo odmówić usunięcia moich danych osobowych;
              </li>
              <li>
                Podanie przeze mnie danych osobowych jest wymogiem ustawowym, a
                konsekwencją ich niepodania będzie brak możliwości uczestnictwa
                w projekcie;
              </li>
              <li>
                Moje dane osobowe nie będą wykorzystywane do zautomatyzowanego
                podejmowania decyzji ani profilowania, o którym mowa w art. 22
                RODO.
              </li>
            </ol>
          </li>
          <li>
            Udostępnię informację o swojej sytuacji na rynku pracy firmom
            badawczym realizującym ewaluacje/analizy/ekspertyzy na zlecenie
            Beneficjenta oraz Instytucji Zarządzającej.
          </li>
        </ol>

        <div className='check-wrapper'>
          {' '}
          {submitErrors?.isStatementsChecked && (
            <Label
              basic
              color='red-clr'
              pointing='above'
              className='small-text err'
            >
              {submitErrors?.isStatementsChecked}
            </Label>
          )}
          <Checkbox
            className={submitMode === 'watch' ? 'acc-dimmed' : ''}
            onChange={(e) => handleOnChange(e)}
            as='h3'
            name='isStatementsChecked'
            data-name='isStatementsChecked'
            // value={isRegulationsChecked}
            checked={curDocument?.isStatementsChecked}
            label={
              <label>
                Potwierdzam powyższe oświadczenia i przyjęcie informacji
                <span style={{ color: 'red' }} className='star'>
                  {' '}
                  *
                </span>
              </label>
            }
          />{' '}
        </div>
      </Wrapper>{' '}
    </SubALayout>
  );
};

export default Statements;
