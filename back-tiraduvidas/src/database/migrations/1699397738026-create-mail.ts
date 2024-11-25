import {MigrationInterface, QueryRunner} from "typeorm";

export class createMail1699397738026 implements MigrationInterface {
    name = 'createMail1699397738026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mail" ("id" SERIAL NOT NULL, "to" character varying NOT NULL, "subject" character varying NOT NULL, "template" character varying, "context" jsonb, "additional_information" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5407da42b983ba54c6c62d462d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mail"`);
    }

}
