import { IsEmail, IsEnum, Length } from 'class-validator';
import { Entity, Column, OneToMany, BeforeInsert, Index } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';
import Model from './Model';
import { Post } from './Post';

@Entity('users')
export class User extends Model {
  @Column({ unique: true })
  @Length(1, 50)
  @Index()
  login: string;

  @Column({ unique: true })
  @Length(2, 100)
  @IsEmail()
  @Index()
  email: string;

  @Exclude()
  @Column()
  @Length(6, 254, { message: 'Nazwz 6 znaków' })
  password: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  banned: boolean;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  blocked: boolean;

  @Column({
    type: 'enum',
    enum: ['wnioskodawca', 'admin', 'ocen', 'god'],
    default: 'wnioskodawca',
  })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
