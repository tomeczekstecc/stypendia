import { IsEmail, Length } from 'class-validator';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';

import { EMAIL_VERIFICATION_TIMEOUT } from '../config/auth';
import { APP_ORIGIN, APP_SECRET } from '../config/app';
import Model from './Model';
import { Submit } from './Submit';
import { UserHistory } from './UserHistory';

@Entity('users')
export class User extends Model {
  // @Index()

  @Column({ unique: true })
  @Length(1, 50)
  login: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Index()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @Length(6, 254, { message: 'Nazwz 6 znaków' })
  password: string;

  @Column({
    type: 'enum',
    enum: ['wnioskodawca', 'admin', 'ocen', 'god'],
    default: 'wnioskodawca',
  })
  role: string;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,

    nullable: true,
  })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,

    nullable: true,
  })
  isBlocked: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,

    nullable: true,
  })
  isRemoved: boolean;

  @Column({ nullable: true })
  failedLogins: number;

  @Column({ nullable: true })
  blockedAt: Date;

  @Column({ nullable: true })
  ckeckedRodoAt: Date;

  @Column({ nullable: true })
  ckeckedRegulAt: Date;

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
