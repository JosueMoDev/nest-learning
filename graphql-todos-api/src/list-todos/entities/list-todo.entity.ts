import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { List } from 'src/lists/entities/list.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity('listTodo')
@Unique('listTodo-todo', ['list', 'todo'])
@ObjectType()
export class ListTodo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  quantity: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  completed: boolean;

  @ManyToOne(() => List, (list) => list.listTodo, { lazy: true })
  @Field(() => List)
  list: List;

  @ManyToOne(() => Todo, (todo) => todo.listTodo, { lazy: true })
  @Field(() => Todo)
  todo: Todo;
}
