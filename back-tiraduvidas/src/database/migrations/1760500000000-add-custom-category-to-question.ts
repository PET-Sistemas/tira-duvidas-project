import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCustomCategoryToQuestion1760500000000
  implements MigrationInterface
{
  name = 'addCustomCategoryToQuestion1760500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "questions" ADD "custom_category" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "questions" DROP COLUMN "custom_category"`,
    );
  }
}
