import { MigrationInterface, QueryRunner } from 'typeorm';

export class OfferIDUniq1649771800878 implements MigrationInterface {
  name = 'OfferIDUniq1649771800878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "deal"`);
    await queryRunner.query(
      `ALTER TABLE "deal" DROP CONSTRAINT "deal_offer_id_fk"`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "additionalConditions" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "UQ_4223a06f76d240b2a4ba448b0a6" UNIQUE ("offerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "status" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT NOW() + interval '7 day'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_4223a06f76d240b2a4ba448b0a6" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" DROP CONSTRAINT "FK_4223a06f76d240b2a4ba448b0a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" DROP CONSTRAINT "FK_4223a06f76d240b2a4ba448b0a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT (now() + '7 days')`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "status" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" DROP CONSTRAINT "UQ_4223a06f76d240b2a4ba448b0a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "additionalConditions" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "deal_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
