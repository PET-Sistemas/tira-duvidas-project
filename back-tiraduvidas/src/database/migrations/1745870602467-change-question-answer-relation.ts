import {MigrationInterface, QueryRunner} from "typeorm";

export class changeQuestionAnswerRelation1745870602467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	// Adicionar a restrição UNIQUE na coluna question_id
        await queryRunner.query(`
            ALTER TABLE "answers" 
            ADD CONSTRAINT "UQ_answers_question_id" 
            UNIQUE ("question_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	// Remover a restrição UNIQUE ao reverter a migration
        await queryRunner.query(`
            ALTER TABLE "answers" 
            DROP CONSTRAINT "UQ_answers_question_id"
        `);
    }

}
