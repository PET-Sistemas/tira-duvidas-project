import {MigrationInterface, QueryRunner} from "typeorm";

export class dropFeedbackStatusColumn1744935484624 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a coluna status
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP COLUMN "situation"`);

        // 2. Remove a enum antiga
        await queryRunner.query(`DROP TYPE "public"."feedbacks_situation_enum"`);

        // 3. Cria nova enum com os novos valores
        await queryRunner.query(`
            CREATE TYPE "public"."feedbacks_status_enum" AS ENUM('satisfactory', 'unsatisfactory')
        `);

        // 4. Recria a coluna status com nova enum
        await queryRunner.query(`
            ALTER TABLE "feedbacks"
            ADD COLUMN "status" "public"."feedbacks_status_enum" NOT NULL DEFAULT 'unsatisfactory'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte: dropa e recria a enum original 'active e inactive'
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."feedbacks_status_enum"`);

        await queryRunner.query(`
            CREATE TYPE "public"."feedbacks_situation_enum" AS ENUM('active', 'inactive')
        `);

        await queryRunner.query(`
            ALTER TABLE "feedbacks"
            ADD COLUMN "situation" "public"."feedbacks_situation_enum" NOT NULL DEFAULT 'inactive'
        `);
    }
}
