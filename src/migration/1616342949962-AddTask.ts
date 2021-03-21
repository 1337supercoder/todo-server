import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTask1616342949962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "task" (text, "userId")
      VALUES ('Create task server', (SELECT id from "user" WHERE email='jhonDoe@mail.com'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "task" WHERE "userId"=(SELECT id from "user" WHERE email='jhonDoe@mail.com');
    `);
  }
}
