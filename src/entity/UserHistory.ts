import { IsDate, IsInt, Length } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Model from './Model';
import { User } from './User';


@Entity('user_history')
export class UserHistory extends Model {
  @Column({ comment: 'ID użytkownika' })
  userId: string;

  @Column({ comment: 'UuidV4 użytkownika' })
  userUuuid: string;

  @Column({ comment: 'Imię użytkownika' })
  @Length(1, 254, {
    message: 'Nazwa użytkownika nie może być dłuższa niż 254 znaków',
  })
  firstName: string;

  @Column({ comment: 'Nazwisko użytkownika' })
  @Length(1, 254, {
    message: 'Nazwa użytkownika nie może być dłuższa niż 254 znaków',
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy zabroniony',

  })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy zablokowany',

  })
  isBlocked: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy usunięty',

  })
  isRemoved: boolean;

  @IsInt({ message: 'Niepoprawny intiger' })
  @Column({comment: 'Liczba nieudanych logowań' })
  failedLogins: number;

  @IsDate({ message: 'Data blokady musi mieć format daty' })
  @Column({ nullable: true, comment: 'Data blokady' })
  blockedAt: Date;

  @Length(3, 500, { message: 'Opis zdarzenia musi mieć od 1 do 500 znaków ' })
  @Column({ type:'text' ,comment: 'Opis zdarzenia' })
  description: string;

  @ManyToOne(() => User, (user) => user.user_history, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
