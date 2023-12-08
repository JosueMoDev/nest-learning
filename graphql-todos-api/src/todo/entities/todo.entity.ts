import { Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Field(() => String)
  state: string;

  @Column()
  @Field(() => String)
  createdAt: string;

  // @OneToOne(() => Account)
  // @JoinColumn()
  // createdBy: Account;

  // @ManyToMany(() => Account)
  // @JoinTable()
  // todoUpdaters: Account[];
}
