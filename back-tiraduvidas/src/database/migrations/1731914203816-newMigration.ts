import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1731914203816 implements MigrationInterface {
    name = 'newMigration1731914203816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
