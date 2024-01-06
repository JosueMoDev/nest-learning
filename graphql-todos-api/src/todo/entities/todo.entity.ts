import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entity/account.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoState } from '../enums/todoState.enum';
import { ListTodo } from 'src/list-todos/entities/list-todo.entity';

@Entity({ name: 'todos ' })
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({
    type: 'text',
    default: TodoState.pending,
  })
  @Field(() => String)
  state: string;

  @Column({
    type: 'text',
    default: new Date().toISOString(),
  })
  @Field()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.todos, {
    nullable: false,
    lazy: true,
  })
  @Index('account-index')
  @Field(() => Account)
  createdBy: Account;

  @OneToMany(() => ListTodo, (listTodo) => listTodo.todo, { lazy: true })
  @Field(() => [ListTodo])
  listTodo: ListTodo;
}
