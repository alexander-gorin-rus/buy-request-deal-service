import { MigrationInterface, QueryRunner } from 'typeorm';

export class truncateDealsTables1656417114765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "offer" CASCADE`);
    await queryRunner.query(`TRUNCATE "deal" CASCADE `);
  }
  down(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
