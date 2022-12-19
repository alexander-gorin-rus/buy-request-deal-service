import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCoverField1655375911530 implements MigrationInterface {
  name = 'addCoverField1655375911530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "cover" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "cover"`);
  }
}
