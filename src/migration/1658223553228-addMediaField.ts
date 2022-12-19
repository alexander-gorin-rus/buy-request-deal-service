import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMediaField1658223553228 implements MigrationInterface {
  name = 'addMediaField1658223553228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "media" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "media"`);
  }
}
