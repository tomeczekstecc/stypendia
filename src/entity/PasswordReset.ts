import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  APP_ORIGIN,
  APP_SECRET,
  PASSWORD_RESET_BYTES,
  PASSWORD_RESET_TIMEOUT,
} from '../config';

import { User } from './User';

@Entity('password_reset')
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column({ nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashToken() {
    const found = await PasswordReset.findOne({ userId: this.userId });


    if (!found || found.token !== this.token) {
      this.token = PasswordReset.hashedToken(this.token);
    }
    if (!this.expiredAt) {
      this.expiredAt = new Date(new Date().getTime() + PASSWORD_RESET_TIMEOUT);
    }
  }

  url = function (plaintextToken: string) {
    return `${APP_ORIGIN}/api/v1/password/reset?id=${this.id}&token=${plaintextToken}`;
  };

  isValid = function (plaintextToken: string) {
    const hash = PasswordReset.hashedToken(plaintextToken)

  return (
    timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
    this.expiredAt > new Date()
  );
}


  static plaintextToken = () => {
    return randomBytes(PASSWORD_RESET_BYTES).toString('hex');
  };

  static hashedToken = (plaintextToken: string) => {
    return createHmac('sha256', APP_SECRET)
      .update(plaintextToken)
      .digest('hex');
  };
}
