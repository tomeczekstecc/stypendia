import { IsEmail, Length } from 'class-validator';
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';
import Model from './Model';
import { Wni } from './Wniosek';
import { UserHistory } from './UserHistory';

@Entity('users')
export class User extends Model {
  // @Index()

  @Column({ unique: true })
  @Length(1, 50)
  login: string;

  @Column()
  @Length(1, 254)
  firstName: string;

  @Column()
  @Length(1, 254)
  lastName: string;

  // @Index()
  @Column({ unique: true })
  @Length(2, 100)
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

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  isBlocked: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  isConfirmed: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  isRemoved: boolean;

  @Column()
  failedLogins: number;

  @Column()
  blockTime: Date

  @Column()
  ckeckedRodoTime:Date

  @Column()
  ckeckedRegulationsTime:Date

  @OneToMany(() => Wni, (wniosek) => wniosek.user)
  wnioski: Wni[];

  @OneToMany(() => UserHistory, (user_history) => user_history.user)
  user_history: UserHistory[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
