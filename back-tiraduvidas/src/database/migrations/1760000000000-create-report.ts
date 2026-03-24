import { MigrationInterface, QueryRunner } from 'typeorm';

export class createReport1760000000000 implements MigrationInterface {
  name = 'createReport1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "reports" (
        "id" SERIAL NOT NULL,
        "respondent_name" text NOT NULL,
        "semester" text NOT NULL,
        "respondent_cpf" character varying(14) NOT NULL,
        "respondent_email" character varying(255) NOT NULL,
        "respondent_phone" character varying(20) NOT NULL,
        "total_answered_questions" integer NOT NULL,
        "workload_hours" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_reports_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reports"`);
  }
}
