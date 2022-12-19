import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeInProgress1659949377454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE offer SET status = 'CREATED' WHERE status = 'IN_PROGRESS'`,
    );
  }

  public async down(): Promise<void> {
    return;
  }
}
