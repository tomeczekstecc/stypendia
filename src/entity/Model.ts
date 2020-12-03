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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid' })
  @Index()
  uuid: string;

  // do before saving
  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  //hide some columns
  toJSON() {
    return {
      ...this,
      id: undefined,
      password: undefined,
    };
  }
}
