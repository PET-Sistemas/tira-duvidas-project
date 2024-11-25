import {MigrationInterface, QueryRunner} from "typeorm";

export class createAnswer1713475860752 implements MigrationInterface {
    name = 'createAnswer1713475860752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."answers_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "question_id" integer NOT NULL, "respondent_id" integer NOT NULL, "auditor_id" integer NOT NULL, "description" text NOT NULL, "status" "public"."answers_status_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_3711a90e21f7025fceb56eb80b0" FOREIGN KEY ("respondent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_ac096a04142c316cae5a5bcf9d8" FOREIGN KEY ("auditor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_ac096a04142c316cae5a5bcf9d8"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_3711a90e21f7025fceb56eb80b0"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TYPE "public"."answers_status_enum"`);
    }

}
