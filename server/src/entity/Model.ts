import { classToPlain } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

//Model is optional - just holds shared columns
export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ comment: 'Data utworzenia' })
  createdAt: Date;

  @UpdateDateColumn({ comment: 'Data ostatniej aktualizacji' })
  updatedAt: Date;

  @Column({ type: 'uuid',comment: 'Unikalny identyfikator uuidV4' })
  @Index()
  uuid: string;

  // do before saving
  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  //hide some columns
  toJSON() {
    // return classToPlain(this);
    return {
      ...this,
      // id: undefined,
      // hash: undefined,
      password: undefined,
      // checksum: undefined,

    };
  }
}
