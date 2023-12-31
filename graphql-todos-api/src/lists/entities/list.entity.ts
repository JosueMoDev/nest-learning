import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from 'src/accounts/entity/account.entity';
import { ListTodo } from 'src/list-todos/entities/list-todo.entity';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Account, (account) => account.lists, {
    nullable: true,
    lazy: true,
  })
  @Index('account_id_index')
  @Field(() => Account)
  account: Account;

  @OneToMany(() => ListTodo, (listTodo) => listTodo.list, { lazy: true })
  @Field(() => ListTodo)
  listTodo: ListTodo;
}
