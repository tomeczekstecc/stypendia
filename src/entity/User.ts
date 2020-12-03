import { IsEmail, Length } from 'class-validator';
import { Entity, Column, OneToMany, BeforeInsert, Index, JoinColumn } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';
import Model from './Model';
import { Wniosek} from './Wniosek';

@Entity('users')
export class User extends Model {
  // @Index()

  @Column({ unique: true })
  @Length(1, 50)
  login: string;

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

  @OneToMany(() => Wniosek, (wniosek) => wniosek.user)
  wnioski: Wniosek[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
