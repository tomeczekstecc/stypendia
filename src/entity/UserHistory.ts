import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Model from './Model';
import { User } from './User';

@Entity('user_history')
export class UserHistory extends Model {
  // @Index()

  @Column()
  userId: string;

  // @Index()
  @Column()
  userUuuid: string;

  @Column()
  email: string;

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
  blockTime: Date;

  @Column()
  ckeckedRodoTime: Date;

  @Column()
  ckeckedRegulationsTime: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.user_history, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
