import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAnswerFeedbackRelation1745871111372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	// Adicionar a restrição UNIQUE na coluna answer_id
        await queryRunner.query(`
            ALTER TABLE "feedbacks" 
            ADD CONSTRAINT "UQ_feedback_answers_id" 
            UNIQUE ("answer_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	await queryRunner.query(`
            ALTER TABLE "feedbacks" 
            DROP CONSTRAINT "UQ_feedback_answers_id"
        `);
    }

}
