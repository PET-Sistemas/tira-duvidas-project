import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMail1713476180611 implements MigrationInterface {
    name = 'changeMail1713476180611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mail" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "mail" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
