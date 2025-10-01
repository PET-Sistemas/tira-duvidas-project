import {MigrationInterface, QueryRunner} from "typeorm";

export class changeQuestion1759337293492 implements MigrationInterface {
    name = 'changeQuestion1759337293492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea"`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "questioner_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea" FOREIGN KEY ("questioner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" DROP CONSTRAINT "FK_f7c1467a17b9c9005d0bc9c5acf"`);
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" DROP CONSTRAINT "FK_203e21f83b1612c98f952e5d1a2"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea"`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "questioner_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_16bd98a3453383adaa927b5d8ea" FOREIGN KEY ("questioner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7c1467a17b9c9005d0bc9c5ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_203e21f83b1612c98f952e5d1a"`);
        await queryRunner.query(`DROP TABLE "user_roles_categories_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02b09d4001c16d639e4390e24e"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_role_enum"`);
    }

}
