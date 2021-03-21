import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1616342949259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" (username, email, password) VALUES ('Jhon Doe', 'jhonDoe@mail.com', 'password');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user" WHERE email='jhonDoe@mail.com';
    `);
  }
}
