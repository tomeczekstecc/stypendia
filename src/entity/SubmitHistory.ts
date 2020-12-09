import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './Model';
import {Submit} from './Submit';

@Entity('submit_history')
export class SubmitHistory extends Model {
  @Column()
  submitId: number;

  @Column()
  status: number;

  @Column({ type: 'date', nullable: true })
  date_official: Date;

  @Column()
  userId: number;

  @ManyToOne(() => Submit, (submit) => submit.history,{nullable: false})
  @JoinColumn({ name: 'submitId', referencedColumnName: 'id' })
  submit: Submit;
}

export default SubmitHistory;
