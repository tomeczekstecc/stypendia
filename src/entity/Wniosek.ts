import { IsEmail, Min } from 'class-validator';
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
import WniHistory from './WniHistory';

@Entity('wnioski')
export class Wni extends Model {
  constructor(wni: Partial<Wni>) {
    super();
    Object.assign(this, wni);
  }
  //
  //I. dane osobowe
  //
  @Column({ comment: 'Wersja wniosku' })
  ver: number;

  @Column({
    type: 'enum',
    enum: [
      'rozp',
      'zlozony',
      'w_ocenie',
      'w_poprawie',
      'odrzucony',
      'negatywny',
      'pozytywny',
      'porzucony',
    ],
    default: 'rozp',
  })
  status: string;

  @Column({ comment: 'Status prawny Wnioskodawcy - Rodzic ucznia' })
  isParent: boolean;

  @Column({ comment: 'Status prawny Wnioskodawcy - Pełnoletni uczeń' })
  isSelf: boolean;

  @Column({ nullable: true })
  phone: string;

  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  epuapAdr: string;

  //
  //  II. DANE OSOBOWE UCZNIA
  //
  @Column()
  pupilFirstName: string;

  @Column()
  pupilLastName: string;

  @Column()
  pupilPesel: string;

  @Column()
  pupilPhone: string;

  @IsEmail()
  @Column()
  pupilEmail: string;

  //
  //  III. DANE DOTYCZĄCE SZKOŁY PONADPODSTAWOWEJ ZNAJDUJĄCEJ SIĘ NA TERENIE
  //

  @Column()
  schoolName: string;

  @Column()
  schoolStreetName: string;

  @Column()
  schoolStreetNr: string;

  @Column()
  schoolTown: string;

  @Column()
  schoolZip: string;

  @Column()
  schoolVoyev: string;

  @Column({
    type: 'enum',
    enum: ['liceum', 'technikum'],
  })
  schoolType: string;

  //
  //  IV. DANE KANDYDATA NA OPIEKUNA DYDAKTYCZNEGO STYPENDYSTY
  //

  @Column()
  counselorFirstName: string;

  @Column()
  counselorLastName: string;

  @Column({
    type: 'enum',
    enum: ['nauczyciel', 'pedagog', 'doradca'],
  })
  counselorProfile: string;

  //
  // V.  PODSTAWOWE KRYTERIA OCENY
  //
  @Column('decimal', { precision: 5, scale: 2 })
  priMathAver: number;

  @Column()
  priLang: string;
  @Column('decimal', { precision: 5, scale: 2 })
  priLangAver: number;

  @Column()
  priOtherSubj: string;
  @Column('decimal', { precision: 5, scale: 2 })
  priOtherSubjAver: number;

  @Column('decimal', { precision: 5, scale: 2 })
  priTotalAver: number;

  @Column('decimal', { precision: 5, scale: 2 })
  allTotalAver: number;

  //
  // V.  PODSTAWOWE KRYTERIA OCENY
  //

  @Column()
  isFinalist: boolean;

  @Column()
  isAllowed: boolean;

  @Column()
  isHandicap: boolean;

  @Column()
  userUuid: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.wnioski)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: User;

  @OneToMany(() => Wni, (wniosek) => wniosek.history)
  history: WniHistory;
  @BeforeInsert()
  calculatePriAver() {
    this.priTotalAver = Math.round(
      (this.priMathAver + this.priLangAver + this.priOtherSubjAver) / 3
    );
  }
}
