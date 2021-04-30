import { IsEnum, Length, Max, Min } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dict_history_events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['submit', 'user'], nullable: false, comment: 'Modele: "submit"-wniosek i "user"-użytkownik' })
  @IsEnum(['submit', 'user'])
  model: string;

  @Column({comment: 'Opis zdarzenia - od 3 do 254 znaków' })
  @Length(3, 254, {
    message: 'Opis nie może być krótszy niż 3 znaki i dłuższy niz 254 znaków',
  })
  description: string;

  @Column({ nullable: true, comment: 'Status: tylko dla wniosków - od 1 do 9' })
  @Min(1, {
    message: 'Status nie może być mniejszy niż 1',
  })
  @Max(9, {
    message: 'Status nie może być większy niż 9',
  })
  status: number;
}
