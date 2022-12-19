import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1664531174920 implements MigrationInterface {
  name = 'migration1664531174920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "isDelete"`);
  }

  public async down(): Promise<void> {
    return;
  }
}
