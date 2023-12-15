import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../entity/account.entity';

@ObjectType()
export class LastUpdate {
  @Field(() => Account)
  account: Account;

  @Field()
  date: Date;
}
