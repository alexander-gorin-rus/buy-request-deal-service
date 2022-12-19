import { MigrationInterface, QueryRunner } from 'typeorm';

export class DealAdd1647352645309 implements MigrationInterface {
  name = 'DealAdd1647352645309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "additionalConditions" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" DROP COLUMN "additionalConditions"`,
    );
  }
}
