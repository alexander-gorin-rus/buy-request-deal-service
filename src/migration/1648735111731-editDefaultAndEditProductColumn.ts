import { MigrationInterface, QueryRunner } from 'typeorm';

export class editDefaultAndEditProductColumn1648735111731
  implements MigrationInterface
{
  name = 'editDefaultAndEditProductColumn1648735111731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" RENAME COLUMN "product" TO "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "expiratedAt" SET DEFAULT NOW() + interval '7 day'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
    );
  }

  down(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
