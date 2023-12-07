import { Field } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  lastname: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    array: true,
  })
  @Field(() => [String])
  roles: string[];

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  //? Relations For Account
  @OneToOne(() => Account)
  createdBy: Account;

  @ManyToOne(() => Account, (account) => account)
  updatedBy: Account[];

  // ? Relations For Todos
  @OneToMany(() => Todo, (todo) => todo.createdBy)
  todosCreators: Todo[];

  @ManyToMany(() => Todo, (todo) => todo.lastUpdated)
  @JoinTable()
  todosUpdaters: Todo[];
}
