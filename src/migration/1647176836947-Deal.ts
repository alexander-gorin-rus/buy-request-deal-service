import { MigrationInterface, QueryRunner } from 'typeorm';

export class Deal1647176836947 implements MigrationInterface {
  name = 'Deal1647176836947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "deal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestId" character varying NOT NULL, "offerId" character varying NOT NULL, "sellerId" character varying NOT NULL, "consumerId" character varying NOT NULL, "status" character varying NOT NULL, "additionalConditions" character varying, "expiratedAt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "requestId" character varying NOT NULL, "product" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "ecogood" boolean NOT NULL, "status" character varying NOT NULL, "isDraft" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "offer"`);
    await queryRunner.query(`DROP TABLE "deal"`);
  }
}
