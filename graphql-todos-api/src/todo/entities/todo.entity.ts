import { Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => Account)
  @JoinColumn()
  createdBy: Account;

  @ManyToMany(() => Account)
  @JoinTable()
  todoUpdaters: Account[];
}
