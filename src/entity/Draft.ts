
import { Entity, Column,  JoinColumn, OneToOne } from 'typeorm';

import Model from './Model';
import { User } from './User';

@Entity('drafts')
export class Draft extends Model {
  constructor(draft: Partial<Draft>) {
    super();
    Object.assign(this, draft);
  }

  @Column({ comment: 'Wersja wniosku', default: 1 })
  ver: number;

  @Column({ comment: 'Numer wniosku' })
  numer: string;

  @Column({
    type: 'enum',
    comment: '1:obowiązujący, 0:archiwalny',
    enum: [0, 1],
    default: 0,
  })
  fresh: boolean;

  @Column({ default: 1, comment: 'Status wniosku', nullable: true })
  status: number;

  @Column({
    comment: 'Identyfiakto tymczasowy - przed nadaniem numeru wniosku ',
    nullable: true,
  })
  tempUuid: string;

  //
  //I. dane osobowe
  //

  @Column({
    type: 'enum',
    enum: ['Rodzic/Opiekun prawny', 'Pełnoletni uczeń'],
    comment:
      '1:Status prawny Wnioskodawcy - Pełnoletni uczeń, 0:Status prawny Wnioskodawcy - Rodzic ucznia',
    nullable: true,
  })
  isSelf: string;

  @Column({
    nullable: true,
    comment: 'Telefon wniskodawcy',
  })
  phone: string;

  @Column({ nullable: true, comment: 'Email wnioskodawcy' })
  email: string;

  @Column({ nullable: true, comment: 'Adres skrzynki ePuap wnioskodawcy' })
  epuapAdr: string;

  //
  //  II. DANE OSOBOWE UCZNIA
  //

  @Column({ comment: 'Imię ucznia', nullable: true })
  pupilFirstName: string;

  @Column({ comment: 'Nazwisko ucznia', nullable: true })
  pupilLastName: string;

  @Column({ comment: 'PESEL ucznia', nullable: true })
  pupilPesel: string;

  @Column({ comment: 'Telefon ucznia', nullable: true })
  pupilPhone: string;

  @Column({ nullable: true, comment: 'Email ucznia' })
  pupilEmail: string;

  //
  //  III. DANE DOTYCZĄCE SZKOŁY PONADPODSTAWOWEJ ZNAJDUJĄCEJ SIĘ NA TERENIE
  //

  @Column({ comment: 'Nazwa szkoły ucznia', nullable: true })
  schoolName: string;

  @Column({ comment: 'Ulica szkoły ucznia', nullable: true })
  schoolStreetName: string;

  @Column({ comment: 'Numer ulicy szkoły ucznia', nullable: true })
  schoolStreetNr: string;

  @Column({ comment: 'Miejscowość szkoły ucznia', nullable: true })
  schoolTown: string;

  @Column({ comment: 'Kod pocztowy szkoły ucznia', nullable: true })
  schoolZip: string;

  @Column({
    comment: 'Województwo szkoły ucznia',
    nullable: true,
  })
  schoolVoyev: string;

  @Column({
    nullable: true,
    comment: 'Typ szkoły ucznia',
  })
  schoolType: string;

  //
  //  IV. DANE KANDYDATA NA OPIEKUNA DYDAKTYCZNEGO STYPENDYSTY
  //

  @Column({ comment: 'Imię opiekuna dydaktycznego ucznia', nullable: true })
  counselorFirstName: string;

  @Column({ comment: 'Nazwisko opiekuna dydaktycznego ucznia', nullable: true })
  counselorLastName: string;

  @Column({
    nullable: true,
    comment: 'Profil opiekuna dydaktycznego',
  })
  counselorProfile: string;

  //
  // V.  PODSTAWOWE KRYTERIA OCENY

  @Column({
    comment: 'Podstawowe kryteria oceny - ocena z matematyki',
    nullable: true,
  })
  priMathGrade: number;

  @Column({
    comment: 'Podstawowe kryteria oceny - nazwa języka obcego',
    nullable: true,
  })
  priLang: string;

  @Column({
    comment: 'Podstawowe kryteria oceny - ocena z wybranego języka',
    nullable: true,
  })
  priLangGrade: number;

  @Column({
    comment:
      'Podstawowe kryteria oceny - nazwa wybranego przedmiotu kluczowego',
    nullable: true,
  })
  priOtherSubj: string;

  @Column({
    comment: 'Podstawowe kryteria oceny - ocena z wybranego przedmiotu',
    nullable: true,
  })
  priOtherSubjGrade: number;

  @Column({
    comment: 'Podstawowe kryteria oceny - średnia z przedmiotów kierunkowych',
    nullable: true,
  })
  priTotalAver: string;

  @Column({
    comment: 'Podstawowe kryteria oceny - średnia z wszystkich przedmiotów',
    nullable: true,
  })
  allTotalAver: string;

  //
  // V.  DDODATKOWE KRYTERIA OCENY
  //

  @Column({
    comment: 'Dodatkowe krytria oceny - czy uzyskał/a tytuł finalisty',
    nullable: true,
  })
  isFinalist: boolean;

  @Column({
    comment:
      'Dodatkowe krytria oceny - czy posiada zezwolenie na indyw. program nauczania',
    nullable: true,
  })
  isAllowed: boolean;

  @Column({
    comment: 'Dodatkowe krytria oceny - czy uczeń/uczennica nbiepełnosprawny/a',
    nullable: true,
  })
  isHandicap: boolean;

  //
  // VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY tab1
  //

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - wybrany przedmiot kierunkowy',
  })
  tab1Subj: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - udział w konkursie/olipiadzie',
    default: 0,
    nullable: true,
  })
  isTab1a: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane pracy badawczej',
    default: 0,
    nullable: true,
  })
  isTab1b: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane pracy badawczej - opis',
    nullable: true,
  })
  tab1b_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane referatu/prezentacji',
    default: 0,
    nullable: true,
  })
  isTab1c: boolean;

  @Column({
    comment:
      'Ścieżka rozwoju - tabela 1 - przygotowane referatu/prezentacji - opis',
    nullable: true,
  })
  tab1c_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane publikacji',
    default: 0,
    nullable: true,
  })
  isTab1d: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane publikacji - opis',
    nullable: true,
  })
  tab1d_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane wystawy',
    default: 0,
    nullable: true,
  })
  isTab1e: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane wystawy - opis',
    nullable: true,
  })
  tab1e_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowanie filmu',
    default: 0,
    nullable: true,
  })
  isTab1f: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowanie filmu - opis',
    nullable: true,
  })
  tab1f_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowane aplikacji',
    default: 0,
    nullable: true,
  })
  isTab1g: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - przygotowanie aplikacji - opis',
    nullable: true,
  })
  tab1g_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - uzyskanie certyfikatu językowego',
    default: 0,
    nullable: true,
  })
  isTab1h: boolean;

  @Column({
    comment:
      'Ścieżka rozwoju - tabela 1 - uzyskanie certyfikatu językowego - opis',
    nullable: true,
  })
  tab1h_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - uzyskanie oceny bardzo dobrej',
    default: 0,
    nullable: true,
  })
  isTab1i: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - własna strona internetowea',
    default: 0,
    nullable: true,
  })
  isTab1j: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - własna strona internetowa - opis',
    nullable: true,
  })
  tab1j_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - inny cel',
    default: 0,
    nullable: true,
  })
  isTab1k: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - inne - opis',
    nullable: true,
  })
  tab1k_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - inne - opis',
    nullable: true,
  })
  tab1Results: number;

  //
  // VIIB. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY tab2
  //

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - wybrany przedmiot kluczowy',
    nullable: true,
  })
  tab2Subj: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - wybrany przedmiot',
    nullable: true,
  })
  tab2SubjName: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - udział w konkursie/olipiadzie',
    default: 0,
    nullable: true,
  })
  isTab2a: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane pracy badawczej',
    default: 0,
    nullable: true,
  })
  isTab2b: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane pracy badawczej - opis',
    nullable: true,
  })
  tab2b_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane referatu/prezentacji',
    default: 0,
    nullable: true,
  })
  isTab2c: boolean;

  @Column({
    comment:
      'Ścieżka rozwoju - tabela 2 - przygotowane referatu/prezentacji - opis',
    nullable: true,
  })
  tab2c_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane publikacji',
    default: 0,
    nullable: true,
  })
  isTab2d: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane publikacji - opis',
    nullable: true,
  })
  tab2d_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane wystawy',
    default: 0,
    nullable: true,
  })
  isTab2e: boolean;


  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane wystawy - opis',
    nullable: true,
  })
  tab2e_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowanie filmu',
    default: 0,
    nullable: true,
  })
  isTab2f: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowanie filmu - opis',
    nullable: true,
  })
  tab2f_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowane aplikacji',
    default: 0,
    nullable: true,
  })
  isTab2g: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - przygotowanie aplikacji - opis',
    nullable: true,
  })
  tab2g_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - uzyskanie certyfikatu językowego',
    default: 0,
    nullable: true,
  })
  isTab2h: boolean;


  @Column({
    comment:
      'Ścieżka rozwoju - tabela 2 - uzyskanie certyfikatu językowego - opis',
    nullable: true,
  })
  tab2h_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - uzyskanie oceny bardzo dobrej',
    default: 0,
    nullable: true,
  })
  isTab2i: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - własna strona internetowea',
    default: 0,
    nullable: true,
  })
  isTab2j: boolean;


  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - własna strona internetowa - opis',
    nullable: true,
  })
  tab2j_desc: string;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - inny cel',
    default: 0,
    nullable: true,
  })
  isTab2k: boolean;

  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - inne - opis',
    nullable: true,
  })
  tab2k_desc: string;


  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - inne - opis',
    nullable: true,
  })
  tab2Results: number;

  //
  // VIII. PLAN WYDATÓW
  //

  @Column({
    comment: 'Zakup pomocy dydaktycznych i przyborów szkolnych',
    default: 0,
  })
  cost1: number;

  @Column({
    comment: 'Wydatki związane z wyposażeniem miejsca domowej nauki',
    default: 0,
  })
  cost2: number;

  @Column({
    comment: 'Zakup sprzętu komputerowego wraz z oprogramowaniem i akcesoriami',
    default: 0,
  })
  cost3: number;

  @Column({
    comment: 'Zakup sprzętu elektronicznego',
    default: 0,
  })
  cost4: number;

  @Column({
    comment: 'Opłaty związane z dostępem do Internetu',
    default: 0,
  })
  cost5: number;

  @Column({
    comment:
      'Koszty transportu ponoszone przez ucznia/uczennicę w celu dotarcia do szkoły oraz na dodatkowe zajęcia edukacyjne. (Nie dotyczy kosztów związanych z zakupem paliwa samochodowego)',
    default: 0,
  })
  cost6: number;

  @Column({
    comment: 'Opłaty za kursy, szkolenia',
    default: 0,
  })
  cost7: number;

  @Column({
    comment:
      'Wydatki zawiązane z wyposażeniem ucznia/uczennicy niezbędnym dla realizacji potrzeb edukacyjno-rozwojowych wskazanych w PRU ',
    default: 0,
  })
  cost8: number;

  @Column({
    comment: 'Opłaty szkolne',
    default: 0,
  })
  cost9: number;

  @Column({
    comment: 'Koszty uczestnictwa w konkursach, turniejach, olimpiadach',
    default: 0,
  })
  cost10: number;

  @Column({
    comment: 'Koszty uczestnictwa w kulturze wysokiej',
    default: 0,
  })
  cost11: number;

  @Column({
    comment: 'Koszty uczestnictwa w kulturze wysokiej',
    default: 0,
  })
  totalCosts: number;

  @Column({
    comment:
      'Uzasadnienie planowanych wydatków, które nie mieszczą się w katalogu wskazanym w § 8 ust. 5 Regulaminu',
    nullable: true,
  })
  substantion1: string;

  @Column({
    comment:
      'Uzasadnienie zakupu sprzętu tożsamego z już zakupionym sprzętem ze środków stypendialnych',
    nullable: true,
  })
  substantion2: string;


  @Column({
    comment: 'Potwierdzenie oświadczeń i informacji',
  })
  isStatementsChecked: boolean;

  //
  //
  //



  @Column({ comment: 'UuuidV4 użytkownika' })
  userUuid: string;

  @Column({ comment: 'ID użytkownika' })
  userId: number;

  @OneToOne(() => User, (user) => user.draft)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: User;



}
