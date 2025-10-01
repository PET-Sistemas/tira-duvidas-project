import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAnswer1759339041847 implements MigrationInterface {
    name = 'changeAnswer1759339041847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_ac096a04142c316cae5a5bcf9d8"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "auditor_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" ADD "auditor_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_ac096a04142c316cae5a5bcf9d8" FOREIGN KEY ("auditor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
