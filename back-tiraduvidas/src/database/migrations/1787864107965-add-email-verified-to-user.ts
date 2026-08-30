import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerifiedToUser1787864107965 implements MigrationInterface {

     name = 'AddEmailVerifiedToUser1787864107965';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "email_verified" boolean NOT NULL DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "email_verified"
    `);
  }

}
