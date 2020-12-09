import{BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'



@Entity('dict_submit_statuses')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      'rozp',
      'zlozony',
      'w_ocenie',
      'w_poprawie',
      'odrzucony',
      'negatywny',
      'pozytywny',
      'porzucony',
      'bez_rozp'
    ],
  })
  title: string;
}
