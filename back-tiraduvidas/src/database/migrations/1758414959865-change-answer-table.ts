import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAnswerTable1758414959865 implements MigrationInterface {
    name = 'changeAnswerTable1758414959865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD "respondent_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_631308cea85830d54b2fc940f33"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "UQ_feedback_answers_id"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_631308cea85830d54b2fc940f33" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_631308cea85830d54b2fc940f33"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ALTER COLUMN "status" SET DEFAULT 'unsatisfactory'`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "UQ_feedback_answers_id" UNIQUE ("answer_id")`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_631308cea85830d54b2fc940f33" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "respondent_name"`);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("name") `);
    }

}
