import { DataSource } from 'typeorm';
import Offer from '../src/modules/offer/offer.entity';
import Deal from '../src/modules/deal/deal.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DEAL_SERVICE_DATABASE,
  entities: [Offer, Deal],
  migrations: ['src/migration/*.{ts,js}'],
});
