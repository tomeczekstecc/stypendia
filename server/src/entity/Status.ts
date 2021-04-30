import { IsEnum } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { statusEnums } from './types';

@Entity('dict_submit_statuses')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @IsEnum(statusEnums)
  @Column({
    type: 'enum',
    enum: statusEnums,
    comment: `Nazwa statusu: ${statusEnums}`,
  })
  title: string;



  @Column({
    type:'int',
    comment: `Numer statusu`,
  })
  value: number;
  @Column({
      comment: `Nazwa do wyświetlenia`,
  })
 description: string;
}
