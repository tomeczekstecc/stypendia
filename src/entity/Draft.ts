import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import Model from './Model';
import { User } from './User';

import {
  counselorProfileTypeEnums,
  voyevEnums,
  schoolTypeEnums,
  priGradesEnums,
  allTotalAvgEnums,
} from './types';

@Entity('drafs')
export class Draft extends Model {
  constructor(draft: Partial<Draft>) {
    super();
    Object.assign(this, draft);
  }

  @Column({ comment: 'Wersja wniosku', default: 1 })
  ver: number;

  //
  //I. dane osobowe
  //
  @Column({
    type: 'enum',
    comment:
      '1:Status prawny Wnioskodawcy - Pełnoletni uczeń, 0:Status prawny Wnioskodawcy - Rodzic ucznia',
    enum: [0, 1],
    nullable: true,
  })
  isSelf: number;

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
id: number
  @Column({ comment: 'Imię ucznia', nullable: true })
  pupilFirstName: string;

  @Length(1, 254, {
    message: 'Nazwisko ucznia musi zawierać od 1 do 254 znaków',
  })
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
    type: 'enum',
    enum: voyevEnums,
    nullable: true,
  })
  schoolVoyev: string;

  @Column({
    type: 'enum',
    enum: schoolTypeEnums,
    comment: 'Typ szkoły ucznia',
    nullable: true,
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
    type: 'enum',
    enum: counselorProfileTypeEnums,
    comment: 'Profil opiekuna dydaktycznego',
    nullable: true,
  })
  counselorProfile: string;

  //
  // V.  PODSTAWOWE KRYTERIA OCENY
  //

  @Column({
    type: 'enum',
    enum: priGradesEnums,
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
    type: 'enum',
    enum: priGradesEnums,
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
    type: 'enum',
    enum: priGradesEnums,
    comment: 'Podstawowe kryteria oceny - ocena z wybranego przedmiotu',
    nullable: true,
  })
  priOtherSubjGrade: number;

  @Column({
    comment: 'Podstawowe kryteria oceny - średnia z przedmiotów kierunkowych',
    nullable: true,
  })
  priTotalAver: number;

  @Column({
    type: 'enum',
    enum: allTotalAvgEnums,
    comment: 'Podstawowe kryteria oceny - średnia z wszystkich przedmiotów',
    nullable: true,
  })
  allTotalAver: string;

  //
  // V.  DDODATKOWE KRYTERIA OCENY
  //

  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uzyskał/a tytuł finalisty',
    enum: [0, 1],
    nullable: true,
  })
  isFinalist: boolean;

  @Column({
    type: 'enum',
    comment:
      'Dodatkowe krytria oceny - czy posiada zezwolenie na indyw. program nauczania',
    enum: [0, 1],
    nullable: true,
  })
  isAllowed: boolean;

  @Column({
    type: 'enum',
    comment: 'Dodatkowe krytria oceny - czy uczeń/uczennica nbiepełnosprawny/a',
    enum: [0, 1],
    nullable: true,
  })
  isHandicap: boolean;

  @Column({ comment: 'Suma kontrolna powiązanego pliku pdf', nullable: true })
  checksum: string;

  @Column({ comment: 'UuuidV4 użytkownika' })
  userUuid: string;

  @Column({ comment: 'ID użytkownika' })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: User;

  // @BeforeInsert()
  // calculatePriAver() {
  //   this.priTotalAver = Math.round(
  //     (this.priMathGrade + this.priLangGrade + this.priOtherSubjGrade) / 3
  //   );
  // }
}
