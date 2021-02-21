import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Model from './Model';
import { User } from './User';
import { fileTypeAllowed } from './types';
import { Submit } from './Submit';

@Entity('files')
export class File extends Model {
  constructor(file: Partial<File>) {
    super();
    Object.assign(this, file);
  }

  @Column({ comment: 'ID użytkownika' })
  userId: number;

  @Column({ comment: 'ID wniosku', nullable: true })
  submitId: number;

  @Column({ comment: 'Ścieżka zapisu' })
  path: string;

  @Column({ comment: 'Folder zapisu' })
  destination: string;

  @Column({ comment: 'Nazwa orginalna pliku' })
  orginalName: string;

  @Column({
    comment: 'Nazwa pliku',
  })
  fileName: string;

  @Column({
    comment: 'Tymczasowy identyfikator dla wniosku',
    nullable: true,
  })
  tempSubmitId: string;

  @Column({
    comment: 'Rodzaj załącznika',
    type: 'enum',
    enum: fileTypeAllowed,
  })
  type: string;

  @Column({ comment: 'Typ mime pliku' })
  mimeType: string;

  @Column({ comment: 'Wilkość pliku (bajty)' })
  size: number;

  @Column({ comment: 'Suma kontrolna pliku' })
  checksum: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy plik usunięty',
    default: 0,
  })
  isRemoved: number;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: 'Czy plik użyty/co najmniej w złożonym wniosku',
    default: 0,
  })
  isUsed: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: User;

  @ManyToOne(() => Submit)
  @JoinColumn({ name: 'submitId', referencedColumnName: 'id' })
  @JoinColumn({ name: 'submitUuid', referencedColumnName: 'uuid' })
  submit: Submit;
}
