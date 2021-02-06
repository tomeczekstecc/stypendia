import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  Length,
  Matches,
  Max,
  min,
  Min,
  MinLength,
} from 'class-validator';
import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Model from './Model';
import { User } from './User';
import SubmitHistory from './SubmitHistory';
import {
  counselorProfileTypeEnums,
  voyevEnums,
  schoolTypeEnums,
  priGradesEnums,
  allTotalAvgEnums,
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
  @Column({ default: 1, comment: 'Status wniosku' })
  status: number;

  // @IsBoolean({ message: 'isParent może przyjąć wartość 0 lub 1' })
  // @Column({ comment: 'Status prawny Wnioskodawcy - Rodzic ucznia' })
  // isParent: boolean;

  //
  //I. dane osobowe
  //

  @IsEnum(['0', '1'], { message: 'Należy wybrać status Wnioskodawcy' })
  @Column({
    type: 'enum',
    enum: ['0', '1'],
    comment:
      '1:Status prawny Wnioskodawcy - Pełnoletni uczeń, 0:Status prawny Wnioskodawcy - Rodzic ucznia',
  })
  isSelf: string;

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

  @Column({ comment: 'Telefon ucznia', nullable: true })
  pupilPhone: string;

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

  @Column({
    comment: 'Podstawowe kryteria oceny - średnia z przedmiotów kierunkowych',
  })
  priTotalAver: number;

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
    message: 'Należy wybrać odpowiedź. czy uczeń/uczennica uzyskał/a tytuł finalisty',
  })
  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uzyskał/a tytuł finalisty',
    enum: ['Tak', 'Nie'],
  })
  isFinalist: boolean;

  @IsEnum(['Tak', 'Nie'], { message: 'Należy wybrać odpowiedź, czy uczeniń posiada zgodę' })
  @Column({
    type: 'enum',
    comment:
      'Dodatkowe krytria oceny - czy posiada zezwolenie na indyw. program nauczania',
    enum: ['Tak', 'Nie'],
  })
  isAllowed: boolean;

  @IsEnum(['Tak', 'Nie'], { message: 'Należy wybrać odpowiedź dot niepłnosprawności' })
  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uczeń/uczennica nbiepełnosprawny/a',
    enum: ['Tak', 'Nie'],
  })
  isHandicap: boolean;

  @Column({
    comment: 'Suma kontrolna powiązanego pliku pdf 1 ',
    nullable: true,
  })
  checksum: string;

  @Exclude()
  @Column({ comment: 'Hash', nullable: true })
  hash: string;

  //@TODO virtual
  @IsDefined({ message: 'Należy dodać załącznik - oświadczenie' })
  @Column({ comment: 'ID załącznika - oświadczenia opiekuna ' })
  statementId: string;
  //@TODO virtual
  @Column({ comment: 'Suma kontrolna - oświadczenia opiekuna ' })
  statementChecksum: string;
  //@TODO virtual
  @Column({ comment: 'Data utworzenia - oświadczenia opiekuna ' })
  statementCreatedAt: string;
  //@TODO virtual
  @IsDefined({ message: 'Należy dodać załącznik - świadectwo' })
  @Column({ comment: 'ID załącznika - świadectwa' })
  report_cardId: string;
  //@TODO virtual
  @Column({ comment: 'Suma kontrolna - świadectwa' })
  report_cardChecksum: string;
  //@TODO virtual
  @Column({ comment: 'Data utworzenia - świadectwa' })
  report_cardCreatedAt: string;
  //@TODO virtual
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

  @BeforeInsert()
  calculatePriAver() {
    this.priTotalAver = Math.round(
      (+this.priMathGrade + +this.priLangGrade + +this.priOtherSubjGrade) / 3
    );
  }
}
