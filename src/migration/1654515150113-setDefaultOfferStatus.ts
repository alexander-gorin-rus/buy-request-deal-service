import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultOfferStatus1654515150113 implements MigrationInterface {
  name = 'setDefaultOfferStatus1654515150113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT NOW() + interval '7 day'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT (now() + '7 days')`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }
}
