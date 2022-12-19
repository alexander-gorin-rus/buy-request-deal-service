import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeOfferINPROGRESStoCREATED1658216959946
  implements MigrationInterface
{
  name = 'changeOfferINPROGRESStoCREATED1658216959946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "status" SET DEFAULT 'CREATED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`,
    );
  }
}
