import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import User from './User';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  text: string;

  @Column('boolean', {
    nullable: false,
    default: false,
  })
  status: boolean = false;

  @Index()
  @IsNotEmpty()
  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;
}
