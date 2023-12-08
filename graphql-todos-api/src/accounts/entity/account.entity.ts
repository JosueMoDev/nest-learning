import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  // @OneToOne(() => Account)
  // createdBy: Account;

  // @ManyToOne(() => Account, (account) => account)
  // updatedBy: Account[];
}
