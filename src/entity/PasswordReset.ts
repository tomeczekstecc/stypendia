import { IsDate, IsString, Length } from 'class-validator';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  APP_ORIGIN,
  APP_SECRET,
  CLIENT_URI,
  PASSWORD_RESET_BYTES,
  PASSWORD_RESET_TIMEOUT,
} from '../config';

@Entity('password_reset')
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 254, {
    message: 'UserId musi zostać dostarczony dla moedelu PasswordReset',
  })
  @Column({ comment: 'ID powiązanego użytkownika' })
  userId: number;

  @Length(1, 254, {
    message: 'Token musi zostać dostarczony dla moedelu PasswordReset',
  })
  @Column({ comment: 'Token dla żądania resetu hasła' })
  token: string;

  @IsDate({
    message: 'ExpiredAt musi zostać dostarczony dla moedelu PasswordReset w formacue daty',
  })
  @Column({ nullable: true, comment: 'Data ważności tokena' })
  expiredAt: Date;

  @CreateDateColumn({ comment: 'Data utworzenia tokena' })
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
    return `${CLIENT_URI}/reset?id=${this.id}&token=${plaintextToken}`;
  };

  isValid = function (plaintextToken: string) {
    const hash = PasswordReset.hashedToken(plaintextToken);

    return (
      timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
      this.expiredAt > new Date()
    );
  };

  static plaintextToken = () => {
    return randomBytes(PASSWORD_RESET_BYTES).toString('hex');
  };

  static hashedToken = (plaintextToken: string) => {
    return createHmac('sha256', APP_SECRET)
      .update(plaintextToken)
      .digest('hex');
  };
}
