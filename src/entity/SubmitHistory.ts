import { IsInt, Min, Max } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './Model';
import {Submit} from './Submit';

@Entity('submit_history')
export class SubmitHistory extends Model {
  @Column({ comment: 'ID wniosku' })
  submitId: number;

  @IsInt({ message: 'Wersja wniosku musi by intigerem' })
  @Min(1, {
    message: 'Status nie może być mniejszy niż 1',
  })
  @Max(9, {
    message: 'Status nie może być większy niż 9',
  })
  status: number;

  @Column({ type: 'date', nullable: true, comment:"Data faktyczna" })
  date_official: Date;

  @Column({comment:"Data użytkownika"})
  userId: number;

  @ManyToOne(() => Submit, (submit) => submit.history, { nullable: false })
  @JoinColumn({ name: 'submitId', referencedColumnName: 'id' })
  submit: Submit;
}

export default SubmitHistory;
