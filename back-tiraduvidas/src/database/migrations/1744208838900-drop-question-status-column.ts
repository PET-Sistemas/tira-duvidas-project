import {MigrationInterface, QueryRunner} from "typeorm";

export class dropQuestionStatusColumn1744208838900 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a coluna status
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "status"`);

        // 2. Remove a enum antiga
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);

        // 3. Cria nova enum com os novos valores
        await queryRunner.query(`
            CREATE TYPE "public"."questions_status_enum" AS ENUM('not_answered', 'answered')
        `);

        // 4. Recria a coluna status com nova enum
        await queryRunner.query(`
            ALTER TABLE "questions"
            ADD COLUMN "status" "public"."questions_status_enum" NOT NULL DEFAULT 'not_answered'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte: dropa e recria a enum original com apenas 'not_answered'
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);

        await queryRunner.query(`
            CREATE TYPE "public"."questions_status_enum" AS ENUM('not_answered')
        `);

        await queryRunner.query(`
            ALTER TABLE "questions"
            ADD COLUMN "status" "public"."questions_status_enum" NOT NULL DEFAULT 'not_answered'
        `);
    }
}
