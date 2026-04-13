import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserCpf1760000001000 implements MigrationInterface {
  name = 'addUserCpf1760000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "cpf" character varying(14)`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_cpf_unique" ON "user" ("cpf")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_user_cpf_unique"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`);
  }
}
