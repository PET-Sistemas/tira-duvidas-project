import {MigrationInterface, QueryRunner} from "typeorm";

export class changeQuestion1759336879819 implements MigrationInterface {
    name = 'changeQuestion1759336879819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_9787401043dc836afd4d815351a"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "moderator_id"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea"`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "questioner_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answers" ALTER COLUMN "respondent_email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea" FOREIGN KEY ("questioner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea"`);
        await queryRunner.query(`ALTER TABLE "answers" ALTER COLUMN "respondent_email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "questioner_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea" FOREIGN KEY ("questioner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "moderator_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_9787401043dc836afd4d815351a" FOREIGN KEY ("moderator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
