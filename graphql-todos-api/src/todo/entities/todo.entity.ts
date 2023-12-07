import { Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoState } from '../enums/todoState.enum';
import { Account } from 'src/accounts/entity/account.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => TodoState)
  state: TodoState;

  @Column()
  @Field(() => String)
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.todosCreators)
  createdBy: Account;

  @ManyToMany(() => Account, (account) => account.todosUpdaters)
  @JoinTable()
  lastUpdated: Account[];
}
