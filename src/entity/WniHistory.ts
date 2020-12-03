import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './Model';
import { User } from './User';
import { Wni } from './Wniosek';

@Entity('wni_history')
export class WniHistory extends Model {
  @Column()
  wniId: number;

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
    ],
  })
  status: string;

  @Column({ type: 'date' })
  date_official: Date;

  @Column()
  userId: number;

  @ManyToOne(() => Wni, (wniosek) => wniosek.history)
  @JoinColumn({ name: 'wniId', referencedColumnName: 'id' })
  wniosek: Wni;
}

export default WniHistory;
