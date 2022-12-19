import { MigrationInterface, QueryRunner } from 'typeorm';
import productSource from '../../source/productSource';

export class AddTitle1660815965296 implements MigrationInterface {
  name = 'AddTitle1660815965296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await productSource.initialize();
    const productQuery = productSource.createQueryRunner();
    const data = await productQuery.query(` SELECT * from product`);
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "title" character varying NOT NULL DEFAULT ''`,
    );
    for (const product of data) {
      await queryRunner.query(
        `UPDATE "offer" SET "title" = '${product.name}' WHERE "productId" = '${product.id}'`,
      );
    }
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "title" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "title"`);
  }
}
