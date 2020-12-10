import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dict_history_events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['submit', 'user'], nullable: false })
  model: string;

  @Column()
  description: string;

  @Column({nullable:true, comment:"status tylko dla wniosków"})
  status: number;
}
