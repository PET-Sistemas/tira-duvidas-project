import {MigrationInterface, QueryRunner} from "typeorm";

export class createQuestion1713475681732 implements MigrationInterface {
    name = 'createQuestion1713475681732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."questions_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "questioner_id" integer NOT NULL, "moderator_id" integer NOT NULL, "status" "public"."questions_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions_categories_categories" ("questionsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_f684f674d408aef9d44af1e1c8c" PRIMARY KEY ("questionsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97c90e910fb9de0f0f04dc7015" ON "questions_categories_categories" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4916181ebb291d641db25f6514" ON "questions_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea" FOREIGN KEY ("questioner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_9787401043dc836afd4d815351a" FOREIGN KEY ("moderator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_categories_categories" ADD CONSTRAINT "FK_97c90e910fb9de0f0f04dc70150" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questions_categories_categories" ADD CONSTRAINT "FK_4916181ebb291d641db25f65142" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_categories_categories" DROP CONSTRAINT "FK_4916181ebb291d641db25f65142"`);
        await queryRunner.query(`ALTER TABLE "questions_categories_categories" DROP CONSTRAINT "FK_97c90e910fb9de0f0f04dc70150"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_9787401043dc836afd4d815351a"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4916181ebb291d641db25f6514"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97c90e910fb9de0f0f04dc7015"`);
        await queryRunner.query(`DROP TABLE "questions_categories_categories"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);
    }

}
