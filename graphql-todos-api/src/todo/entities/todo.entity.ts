import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entity/account.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  @Field(() => String)
  state: string;

  @Column()
  @Field(() => String)
  createdAt: string;

  @ManyToOne(() => Account, (account) => account.todos, {
    nullable: false,
    lazy: true,
  })
  @Index('account-index')
  @Field(() => [Account])
  account: Account[];
}
