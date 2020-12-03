import { IsEmail, Min } from 'class-validator';
import { Entity, Column, ManyToOne, BeforeInsert, JoinColumn } from 'typeorm';

import Model from './Model';
import { User } from './User';

@Entity('wnioski')
export class Wniosek extends Model {
  //
  //I. dane osobowe
  //
  @Column({ comment: 'Wersja wniosku' })
  ver: number;

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
  @Column({type: "float"})
  priMathAver: number;

  @Column()
  priLang: string;
  @Column({type: "float"})
  priLangAver: number;

  @Column()
  priOtherSubj: string;
 @Column({type: "float"})
  priOtherSubjAver: number;

 @Column({type: "float"})
  priTotalAver: number;

  @Column({type: "float"})
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

  @ManyToOne(() => User, (user) => user.wnioski)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, (user) => user.wnioski)
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  @BeforeInsert()
  calculatePriAver() {
    this.priTotalAver =
      (this.priMathAver + this.priLangAver + this.priTotalAver) / 3;
  }
}
