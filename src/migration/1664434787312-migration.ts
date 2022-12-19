import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1664434787312 implements MigrationInterface {
  name = 'migration1664434787312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "isDelete" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "isDelete"`);
  }
}
