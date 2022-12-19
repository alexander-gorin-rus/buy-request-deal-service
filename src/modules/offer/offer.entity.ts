import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EOfferStatus, Media } from './interfaces/offer.interface';
import Deal from '../deal/deal.entity';

@Entity()
export default class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  requestId: string;

  @Column()
  productId: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  ecogood: boolean;

  @Column({ default: 'CREATED' })
  status: EOfferStatus;

  @Column()
  isDraft: boolean;

  @Column({ default: '' })
  cover: string;

  @OneToOne(() => Deal, (deal) => deal.offer)
  deal: Deal;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  media: Media[];

  @Column({ nullable: true, default: '' })
  additionalConditions: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
