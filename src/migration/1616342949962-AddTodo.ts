import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodo1616342949962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "todo" (text, "userId")
      VALUES ('Create todo server', (SELECT id from "user" WHERE email='jhonDoe@mail.com'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "todo" WHERE "userId"=(SELECT id from "user" WHERE email='jhonDoe@mail.com');
    `);
  }
}
