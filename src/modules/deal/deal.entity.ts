import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EDealStatus } from '../deal/interfaces/deal.interface';
import Offer from '../offer/offer.entity';

@Entity()
export default class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requestId: string;

  @Column({ unique: true })
  offerId: string;

  @OneToOne(() => Offer)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @Column()
  sellerId: string;

  @Column()
  consumerId: string;

  @Column({ nullable: true, default: 'IN_PROGRESS' })
  status: EDealStatus;

  @Column({ nullable: true })
  additionalConditions: string;

  @Column({ nullable: true, default: () => "NOW() + interval '7 day'" })
  expiratedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
