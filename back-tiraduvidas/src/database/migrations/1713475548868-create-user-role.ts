import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserRole1713475548868 implements MigrationInterface {
    name = 'createUserRole1713475548868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_role_enum" AS ENUM('superadmin', 'admin', 'anonymous', 'respondent', 'moderator', 'questioner')`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "role" "public"."user_roles_role_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_02b09d4001c16d639e4390e24e" ON "user_roles" ("user_id", "role") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE TABLE "user_roles_categories_categories" ("userRolesId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_7dea59e8663886c04586388bd4f" PRIMARY KEY ("userRolesId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_203e21f83b1612c98f952e5d1a" ON "user_roles_categories_categories" ("userRolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f7c1467a17b9c9005d0bc9c5ac" ON "user_roles_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" ADD CONSTRAINT "FK_203e21f83b1612c98f952e5d1a2" FOREIGN KEY ("userRolesId") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" ADD CONSTRAINT "FK_f7c1467a17b9c9005d0bc9c5acf" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" DROP CONSTRAINT "FK_f7c1467a17b9c9005d0bc9c5acf"`);
        await queryRunner.query(`ALTER TABLE "user_roles_categories_categories" DROP CONSTRAINT "FK_203e21f83b1612c98f952e5d1a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7c1467a17b9c9005d0bc9c5ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_203e21f83b1612c98f952e5d1a"`);
        await queryRunner.query(`DROP TABLE "user_roles_categories_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02b09d4001c16d639e4390e24e"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_role_enum"`);
    }

}
