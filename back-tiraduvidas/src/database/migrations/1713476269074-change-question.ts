import {MigrationInterface, QueryRunner} from "typeorm";

export class changeQuestion1713476269074 implements MigrationInterface {
    name = 'changeQuestion1713476269074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
