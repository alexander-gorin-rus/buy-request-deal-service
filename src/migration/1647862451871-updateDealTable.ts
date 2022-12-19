import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateDealTable1647862451871 implements MigrationInterface {
  name = 'updateDealTable1647862451871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "deal"
          ALTER COLUMN "offerId" TYPE uuid using "offerId"::uuid `);
    await queryRunner.query(`
          ALTER TABLE "deal"
          ALTER COLUMN "offerId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "deal"
          ADD CONSTRAINT deal_offer_id_fk
          FOREIGN KEY ("offerId") REFERENCES "offer"
          ON UPDATE CASCADE ON DELETE CASCADE `);
  }
  down(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
