import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
@ObjectType()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
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
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  role: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  // //? Relations For Account
  @ManyToOne(() => Account, (account) => account.lastUpdatedBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'lastUpdatedBy' })
  @Field(() => Account, { nullable: true })
  lastUpdatedBy?: string;

  @OneToMany(() => Todo, (todo) => todo.createdBy, { lazy: true })
  @Field(() => [Todo])
  todos: Todo[];
}
