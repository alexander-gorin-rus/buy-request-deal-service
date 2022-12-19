import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStatuses1653057916597 implements MigrationInterface {
  name = 'UpdateStatuses1653057916597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT NOW() + interval '7 day'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT (now() + '7 days')`,
    );
  }
}
