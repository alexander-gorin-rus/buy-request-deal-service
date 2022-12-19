import { MigrationInterface, QueryRunner } from 'typeorm';

export class setNotRequiredAdditionalConditions1649314550713
  implements MigrationInterface
{
  name = 'setNotRequiredAdditionalConditions1649314550713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "additionalConditions" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal" ALTER COLUMN "additionalConditions" DROP DEFAULT`,
    );
  }
}
