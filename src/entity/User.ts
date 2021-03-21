import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import Task from './Task';

@Entity()
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
