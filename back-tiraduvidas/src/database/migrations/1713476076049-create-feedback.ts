import {MigrationInterface, QueryRunner} from "typeorm";

export class createFeedback1713476076049 implements MigrationInterface {
    name = 'createFeedback1713476076049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."feedbacks_situation_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "feedbacks" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "answer_id" integer NOT NULL, "justification" text NOT NULL, "situation" "public"."feedbacks_situation_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_4334f6be2d7d841a9d5205a100e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_631308cea85830d54b2fc940f33" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_631308cea85830d54b2fc940f33"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_4334f6be2d7d841a9d5205a100e"`);
        await queryRunner.query(`DROP TABLE "feedbacks"`);
        await queryRunner.query(`DROP TYPE "public"."feedbacks_situation_enum"`);
    }

}
