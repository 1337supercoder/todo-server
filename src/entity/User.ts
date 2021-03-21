import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import Todo from './Todo';

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

  @OneToMany(() => Todo, (todo: Todo) => todo.user)
  todos: Todo[];
}
