import {MigrationInterface, QueryRunner} from "typeorm";

export class changeBackQuestionAnswerRelation1748021818932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	await queryRunner.query(`
            ALTER TABLE "answers" 
            DROP CONSTRAINT "UQ_answers_question_id"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	await queryRunner.query(`
            ALTER TABLE "answers" 
            ADD CONSTRAINT "UQ_answers_question_id" 
            UNIQUE ("question_id")
        `);
    }

}
