import {
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';

import { EMAIL_VERIFICATION_TIMEOUT } from '../config/auth';
import { APP_ORIGIN, APP_SECRET } from '../config/app';
import Model from './Model';
import { Submit } from './Submit';
import { UserHistory } from './UserHistory';
import { rolesEnum } from './types';

@Entity('users')
export class User extends Model {
  // @Index()

  @Column({ unique: true, comment: 'Nazwa użytkownika' })
  @Length(2, 50, {
    message: 'Nazwa użytkownika musi zawierać od 2 do 50 znaków',
  })
  login: string;

  @Column({ comment: 'Imię użytkownika' })
  @Length(2, 254, {
    message: 'Imię użytkownika musi zawierać od 2 do 254 znaków',
  })
  firstName: string;

  @Column({ comment: 'Nazwisko użytkownika' })
  @Length(1, 254, {
    message: 'Nazwisko użytkownika musi zawierać od 2 do 254 znaków',
  })
  lastName: string;

  // @Index()
  @Column({ unique: true, comment: 'Email użytkownika' })
  @IsEmail(undefined, { message: 'Email musi być w odpowiednim formacie' })
  email: string;

  @Exclude()
  @Column({ comment: 'Hasło konta użytkownika' })
  @Length(8, 24, { message: 'Hasło musi zawierać od 8 do 24 znaków' })
  @Matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u, {
    message:
      'Hasło musi zawierać co najmiej: 1 wielką literę, 1 małą literę i 1 cyfrę',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: rolesEnum,
    default: 'wnioskodawca',
    comment: 'Rola użytkownika',
  })
  role: string;

  @Column({ nullable: true, comment: 'Data blokady' })
  verifiedAt: Date;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy zabroniony',
    default: 0,
  })
  isBanned: number;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy zablokowany',
    default: 0,
  })
  isBlocked: number;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy użytkownik usunięty',
    default: 0,
  })
  isRemoved: number;

  @Column({ default: 0, comment: 'Liczba nieudanych logowań' })
  failedLogins: number;

  @Column({ nullable: true, comment: 'Data blokady' })
  blockedAt: Date;

  @Column({ nullable: true, comment: 'Data potwierdzenia Rodo' })
  ckeckedRodoAt: Date;

  @Column({ nullable: true, comment: 'Data potwierdzenia Regulaminu' })
  ckeckedRegulationsAt: Date;

  @OneToMany(() => Submit, (submit) => submit.user)
  submits: Submit[];

  @OneToMany(() => UserHistory, (user_history) => user_history.user)
  user_history: UserHistory[];
  static id: any;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static signVerificationUrl = function (url: string) {
    return createHmac('sha256', APP_SECRET).update(url).digest('hex');
  };

  verificationUrl = function () {
    const token = createHash('sha1').update(this.email).digest('hex');
    const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT;

    const url = `${APP_ORIGIN}/api/v1/email/verify?id=${this.id}&token=${token}&expires=${expires}`;
    const signature = User.signVerificationUrl(url);

    return `${url}&signature=${signature}`;
  };

  static hasValidVerificationUrl = (path: string, query: any) => {
    const url = `${APP_ORIGIN}${path}`;
    console.log(url, 'url');
    const original = url.slice(0, url.lastIndexOf('&'));
    console.log(original, 'original');
    const signature: any = User.signVerificationUrl(original);
    console.log(signature, 'signature');

    return (
      timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) &&
      +query.expires > Date.now()
    );
  };
}
