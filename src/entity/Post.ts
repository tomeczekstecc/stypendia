import { Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Model from './Model';
import { User } from './User';

@Entity('posts')
export class Post extends Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(10)
  title: string;

  @Column()
  body: string;

  @Column()
  userUuid: string;

  @ManyToOne(() => User)
  user: User;
}
