import {
  Equals,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Matches,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Model from './Model';
import { User } from './User';
import SubmitHistory from './SubmitHistory';
import {
  counselorProfileTypeEnums,
  voyevEnums,
  schoolTypeEnums,
  priGradesEnums,
  allTotalAvgEnums,
  averEnum,
} from './types';
import { Exclude } from 'class-transformer';

@Entity('submits')
export class Submit extends Model {
  constructor(submit: Partial<Submit>) {
    super();
    Object.assign(this, submit);
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

  // @IsInt({ message: 'Status musi by intigerem' })
  // @Min(1, {
  //   message: 'Status nie może być mniejszy niż 1',
  // })
  // @Max(9, {
  //   message: 'Status nie może być większy niż 9',
  // })
  @Column({ default: 0, comment: 'Status wniosku' })
  status: number;

  // @IsBoolean({ message: 'isParent może przyjąć wartość 0 lub 1' })
  // @Column({ comment: 'Status prawny Wnioskodawcy - Rodzic ucznia' })
  // isParent: boolean;

  // @IsUUID('4', { message: 'Błędny tempUuid' })
  @Column({
    comment: 'Identyfiakto tymczasowy - przed nadaniem numeru wniosku ',
    nullable: true,
  })
  tempUuid: string;

  //
  //I. dane osobowe
  //

  @IsEnum(['Rodzic/Opiekun prawny', 'Pełnoletni uczeń'], {
    message: 'Należy wybrać status Wnioskodawcy',
  })
  @Column({
    type: 'enum',
    enum: ['Rodzic/Opiekun prawny', 'Pełnoletni uczeń'],
    comment:
      '1:Status prawny Wnioskodawcy - Pełnoletni uczeń, 0:Status prawny Wnioskodawcy - Rodzic ucznia',
  })
  isSelf: string;

  @ValidateIf((o) => o.phone)
  @Matches(/^(?:[0-9\-\+]{9,15})$/, {
    message:
      'Numer telefonu musi mieć poprawny format (dozwolone cyfty,"+" oraz "-", od 9 do 15 znaków)',
  })
  @Column({
    nullable: true,
    comment: 'Telefon wniskodawcy',
  })
  phone: string;

  @IsEmail(undefined, { message: 'Email musi mieć poprawny format' })
  @Column({ nullable: true, comment: 'Email wnioskodawcy' })
  email: string;

  @Column({ nullable: true, comment: 'Adres skrzynki ePuap wnioskodawcy' })
  epuapAdr: string;

  //
  //  II. DANE OSOBOWE UCZNIA
  //
  @Length(1, 254, { message: 'Imię ucznia musi zawierać od 1 do 254 znaków' })
  @Column({ comment: 'Imię ucznia' })
  pupilFirstName: string;

  @Length(1, 254, {
    message: 'Nazwisko ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Nazwisko ucznia' })
  pupilLastName: string;

  @Length(11, 11, {
    message: 'Pesel ucznia musi zawierać 11 znaków',
  })
  @Column({ comment: 'PESEL ucznia' })
  pupilPesel: string;

  @ValidateIf((o) => o.pupilPhone)
  @Matches(/^(?:[0-9\-\+]{9,15})$/, {
    message:
      'Numer telefonu musi mieć poprawny format (dozwolone cyfty,"+" oraz "-", od 9 do 15 znaków)',
  })
  @Column({ comment: 'Telefon ucznia', nullable: true })
  pupilPhone: string;

  @ValidateIf((o) => o.pupilEmail)
  @IsEmail(undefined, { message: 'Email musi mieć poprawny format' })
  @Column({ nullable: true, comment: 'Email ucznia' })
  pupilEmail: string;

  //
  //  III. DANE DOTYCZĄCE SZKOŁY PONADPODSTAWOWEJ ZNAJDUJĄCEJ SIĘ NA TERENIE
  //

  @Length(1, 254, {
    message: 'Nazwa szkoły ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Nazwa szkoły ucznia' })
  schoolName: string;

  @Length(1, 254, {
    message: 'Ulica szkoły ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Ulica szkoły ucznia' })
  schoolStreetName: string;

  @Length(1, 254, {
    message: 'Numer ulicy szkoły ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Numer ulicy szkoły ucznia' })
  schoolStreetNr: string;

  @Length(1, 254, {
    message: 'Miejscowość szkoły ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Miejscowość szkoły ucznia' })
  schoolTown: string;

  @Matches(/\d{2}-\d{3}/, {
    message: 'Kod pocztowy należy podać w formacie: 00-000',
  })
  @Column({ comment: 'Kod pocztowy szkoły ucznia' })
  schoolZip: string;

  @IsEnum(voyevEnums, { message: 'Należy podać jedno z województw' })
  @Column({
    comment: 'Województwo szkoły ucznia',
    type: 'enum',
    enum: voyevEnums,
  })
  schoolVoyev: string;

  @IsEnum(schoolTypeEnums, { message: 'Należy wskazać liceum lub technikum' })
  @Column({
    type: 'enum',
    enum: schoolTypeEnums,
    comment: 'Typ szkoły ucznia',
  })
  schoolType: string;

  //
  //  IV. DANE KANDYDATA NA OPIEKUNA DYDAKTYCZNEGO STYPENDYSTY
  //
  @Length(1, 254, {
    message:
      'Imię opiekuna dydaktycznego ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Imię opiekuna dydaktycznego ucznia' })
  counselorFirstName: string;

  @Length(1, 254, {
    message:
      'Nazwisko opiekuna dydaktycznego ucznia musi zawierać od 1 do 254 znaków',
  })
  @Column({ comment: 'Nazwisko opiekuna dydaktycznego ucznia' })
  counselorLastName: string;

  @IsEnum(counselorProfileTypeEnums, {
    message: 'Należy wybrać profil opiekuna dydaktycznego ucznia',
  })
  @Column({
    type: 'enum',
    enum: counselorProfileTypeEnums,
    comment: 'Profil opiekuna dydaktycznego',
  })
  counselorProfile: string;

  //
  // V.  PODSTAWOWE KRYTERIA OCENY
  //
  @IsEnum(priGradesEnums, { message: 'Należy wybrać ocenę dla matematyki' })
  @Column({
    type: 'enum',
    enum: priGradesEnums,
    comment: 'Podstawowe kryteria oceny - ocena z matematyki',
  })
  priMathGrade: number;

  @Length(1, 254, {
    message: 'Należy wskazać język obcy',
  })
  @Column({ comment: 'Podstawowe kryteria oceny - nazwa języka obcego' })
  priLang: string;

  @IsEnum(priGradesEnums, {
    message: 'Należy wybrać ocenę dla języka obcego',
  })
  @Column({
    type: 'enum',
    enum: priGradesEnums,
    comment: 'Podstawowe kryteria oceny - ocena z wybranego języka',
  })
  priLangGrade: number;

  @Length(1, 254, {
    message: 'Należy wskazać inny przedmiot',
  })
  @Column({
    comment:
      'Podstawowe kryteria oceny - nazwa wybranego przedmiotu kluczowego',
  })
  priOtherSubj: string;

  @IsEnum(priGradesEnums, {
    message: 'Należy wybrać ocenę dla innego przedmiotu',
  })
  @Column({
    type: 'enum',
    enum: priGradesEnums,
    comment: 'Podstawowe kryteria oceny - ocena z wybranego przedmiotu',
  })
  priOtherSubjGrade: number;

  @IsEnum(averEnum, {
    message: 'Średnia przedmiotów kierunkowych musi wynosić co najmniej 5.33',
  })
  @Column({
    type: 'enum',
    enum: averEnum,
    comment: 'Podstawowe kryteria oceny - średnia z przedmiotów kierunkowych',
  })
  priTotalAver: string;

  @IsEnum(allTotalAvgEnums, {
    message: 'Należy wybrać średnią wszystkich ocen',
  })
  @Column({
    type: 'enum',
    enum: allTotalAvgEnums,
    comment: 'Podstawowe kryteria oceny - średnia z wszystkich przedmiotów',
  })
  allTotalAver: string;

  //
  // V.  DDODATKOWE KRYTERIA OCENY
  //

  @IsEnum(['Tak', 'Nie'], {
    message:
      'Należy wybrać odpowiedź, czy uczeń/uczennica uzyskał/a tytuł finalisty',
  })
  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uzyskał/a tytuł finalisty',
    enum: ['Tak', 'Nie'],
  })
  isFinalist: boolean;

  @IsEnum(['Tak', 'Nie'], {
    message: 'Należy wybrać odpowiedź, czy uczeń/uczennica posiada zgodę',
  })
  @Column({
    type: 'enum',
    comment:
      'Dodatkowe krytria oceny - czy posiada zezwolenie na indyw. program nauczania',
    enum: ['Tak', 'Nie'],
  })
  isAllowed: boolean;

  @IsEnum(['Tak', 'Nie'], {
    message: 'Należy wybrać odpowiedź dot. niepełnosprawności',
  })
  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uczeń/uczennica nbiepełnosprawny/a',
    enum: ['Tak', 'Nie'],
  })
  isHandicap: boolean;

  //
  // VII. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY tab1
  //
  @IsString({
    message: 'Należy wskazać przedmiot (lista z części V)',
  })
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

  @ValidateIf((o) => o.isTab1b === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot.pracy badawczej musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1c === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. referatu/prezentacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1d === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. publikacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1e === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. wystawy musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1f === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. filmu musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1g === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. programu komputerowego/aplikacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1h === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. certyfikatu musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1j === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. strony internetowej musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab1k === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. innych rezultatów musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
    comment: 'Ścieżka rozwoju - tabela 1 - inne - opis',
    nullable: true,
  })
  tab1k_desc: string;

  @Equals(3, {
    message: 'Liczba wybranych rezultatów w tabeli 1 musi wynosić dokładnie 3',
  })
  @Column({
    comment: 'Ścieżka rozwoju - tabela 1 - inne - opis',
    nullable: true,
  })
  tab1Results: number;

  //
  // VIIB. ŚCIEŻKA ROZWOJU EDUKACYJNEGO UCZNIA / UCZENNICY tab2
  //
  @IsString({
    message: 'Należy wybrać przedmiot kluczowy',
  })
  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - wybrany przedmiot kluczowy',
  })
  tab2Subj: string;

  @ValidateIf(
    (o) =>
      o.tab2Subj === 'język obcy nowożytny' || o.tab2Subj === 'przedmiot ICT'
  )
  @MinLength(3, {
    message: 'Należy wpisać nazwę wybranego przedmiotu kluczowego',
  })
  @Column({
    comment: 'Ścieżka rozwoju - tabela 2 - wybrany przedmiot',
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

  @ValidateIf((o) => o.isTab2b === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot.pracy badawczej musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2c === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. referatu/prezentacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2d === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. publikacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2e === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. wystawy musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2f === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. filmu musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2g === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. programu komputerowego/aplikacji musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2h === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. certyfikatu musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2j === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. strony internetowej musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
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

  @ValidateIf((o) => o.isTab2k === true)
  @MinLength(10, {
    message:
      'Zacznij wpisywać tekst / Pole dot. innych rezultatów musi zawierać co nakmniej 10 znaków',
  })
  @Column({
    type: 'text',
    comment: 'Ścieżka rozwoju - tabela 2 - inne - opis',
    nullable: true,
  })
  tab2k_desc: string;

  @Equals(3, {
    message: 'Liczba wybranych rezultatów w tabeli 2 musi wynosić dokładnie 3',
  })
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

  @Min(0.1, {
    message:
      'Wartość całkowita planu wydatków nie może być mniejsza niż 5000,00 PLN',
  })
  @Min(5000, {
    message:
      'Wartość całkowita planu wydatków nie może być mniejsza lub równa zeru i przewyższać 5000',
  })
  @Column({
    comment: 'Koszty uczestnictwa w kulturze wysokiej',
    default: 0,
  })
  totalCosts: number;

  @Column({
    type: 'text',
    comment:
      'Uzasadnienie planowanych wydatków, które nie mieszczą się w katalogu wskazanym w § 8 ust. 5 Regulaminu',
    nullable: true,
  })
  substantion1: string;

  @Column({
    type: 'text',
    comment:
      'Uzasadnienie zakupu sprzętu tożsamego z już zakupionym sprzętem ze środków stypendialnych',
    nullable: true,
  })
  substantion2: string;

  @Equals(true, {
    message:
      'Należy zapoznać się z treścią oświadczeń i informacji oraz potwierdzić zapoznanie się z nimi',
  })
  @Column({
    comment: 'Potwierdzenie oświadczeń i informacji',
  })
  isStatementsChecked: boolean;

  //
  //
  //
  @Column({
    comment: 'Suma kontrolna powiązanego pliku pdf 1 ',
    nullable: true,
  })
  checksum: string;

  @Exclude()
  @Column({ comment: 'Hash', nullable: true })
  hash: string;

  @Column({ comment: 'Csrf' })
  _csrf: string;

  @Column({ comment: 'UuuidV4 użytkownika' })
  userUuid: string;

  @Column({ comment: 'ID użytkownika' })
  userId: number;

  @ManyToOne(() => User, (user) => user.submits)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: User;

  @OneToMany(() => SubmitHistory, (submit_history) => submit_history.submit)
  history: SubmitHistory[];

  // @BeforeUpdate()
  // async checkAtt() {
  //   let errors: any = {};
  //   const statement = await getRepository(File)
  //     .createQueryBuilder('file')
  //     .select()
  //     .where('submitId = :submitId and type = :type', {
  //       submitId: this.id,
  //       type: 'statement',
  //     })
  //     .execute();
  //   const report_card = await getRepository(File)
  //     .createQueryBuilder('file')
  //     .select()
  //     .where('submitId = :submitId and type = :type', {
  //       submitId: this.id,
  //       type: 'report_card',
  //     })
  //     .execute();
  //   if (statement.length === 0) throw Error('jhweihdweddw');
  //   // throw Error('Należy dodać oświadczenie')

  //   if (report_card.length === 0) return undefined;
  //   // throw Error('Należy dodać świadectwo szkolne')
  // }
}
