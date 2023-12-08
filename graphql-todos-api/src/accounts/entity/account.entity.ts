import { Field, ObjectType } from '@nestjs/graphql';
import { ValidRoles } from 'src/authentication/enums/valid-roles.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Account {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  lastname: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => [ValidRoles])
  @Column({
    type: 'text',
    array: true,
  })
  roles: ValidRoles[];

  @Field(() => Boolean)
  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  //? Relations For Account
  @OneToOne(() => Account)
  createdBy: Account;

  @ManyToOne(() => Account, (account) => account)
  updatedBy: Account[];
}
