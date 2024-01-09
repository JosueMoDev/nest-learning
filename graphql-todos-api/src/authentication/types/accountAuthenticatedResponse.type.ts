import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entity/account.entity';
@ObjectType()
export class AccountAuthenticatedResponse {
  @Field(() => String)
  token: string;
  @Field(() => Account)
  account: Account;
}
