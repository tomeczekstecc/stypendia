import { IsEmail, Length, Matches } from 'class-validator';
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';

import { EMAIL_VERIFICATION_TIMEOUT } from '../config/auth';
import { APP_SECRET, CLIENT_URI } from '../config/app';
import Model from './Model';
import { Submit } from './Submit';
import { UserHistory } from './UserHistory';
import { rolesEnum } from './types';
import { Draft } from './Draft';
import { File } from './File';

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
  @IsEmail(undefined, {
    message: (props) => `${props.value || 'Ta wartość'} nie jest poprawnym adresem email`,
  })
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

  @Column({ nullable: true, comment: 'Data weryfikacji emaila' })
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

  @Column({
    nullable: true,
    comment: 'Data ostatniej wysyłki weryfikacji emaila',
  })
  lastSendEmailAt: Date;

  @Column({
    nullable: true,
    comment: 'Data ostatniej wysyłki maila do resetu hasła',
  })
  lastResetEmailAt: Date;

  @Column({
    nullable: true,
    comment: 'Data ostatniej zmiany hasła',
  })
  lastPassChangeAt: Date;

  @Exclude()
  @OneToMany(() => Submit, (submit) => submit.user)
  submits: Submit[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => UserHistory, (user_history) => user_history.user)
  user_history: UserHistory[];
  static id: any;

  @OneToOne(() => Draft)
  draft: Draft;

  @Expose() get submitsCount(): any {
    return this.submits?.length;
  }

  @Expose() get activeSubmitsCount(): any {
    return this.submits.filter((s) => s.status > 1).length;
  }

  @BeforeInsert()
  async checks() {
    this.ckeckedRegulationsAt = await new Date();
    this.ckeckedRodoAt = await new Date();
    this.lastPassChangeAt = await new Date();
  }

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

    const url = `${CLIENT_URI}/verify?id=${this.id}&token=${token}&expires=${expires}`;
    const baseUrl = `/verify?id=${this.id}&token=${token}&expires=${expires}`;
    const signature = User.signVerificationUrl(baseUrl);

    return `${url}&signature=${signature}`;
  };

  static hasValidVerificationUrl = (path: string, query: any) => {
    const baseUrl = path.split('/api/v1/email')[1];
    const original = baseUrl.slice(0, baseUrl.lastIndexOf('&'));
    const signature: any = User.signVerificationUrl(original);
    return (
      timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) &&
      +query.expires > Date.now()
    );
  };
}
