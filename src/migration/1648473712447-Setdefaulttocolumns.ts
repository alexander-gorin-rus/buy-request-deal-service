import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setdefaulttocolumns1648473712447 implements MigrationInterface {
  name = 'Setdefaulttocolumns1648473712447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT ''`,
    );

    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "status" SET DEFAULT ''`,
    );
  }

  down(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
