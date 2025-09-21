import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAnswerTableRespondentEmail1758416369137 implements MigrationInterface {
    name = 'changeAnswerTableRespondentEmail1758416369137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" ADD "respondent_email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "respondent_email"`);
    }

}
