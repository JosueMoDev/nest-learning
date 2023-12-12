import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Account } from './entity/account.entity';
import { AccountsService } from './accounts.service';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountService: AccountsService) {}
  @Query(() => Account, { name: 'findOneById' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Account> {
    return this.accountService.findOneById(id);
  }
}
