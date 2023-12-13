import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './entity/account.entity';
import { AccountsService } from './accounts.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateAccountInput } from './inputs';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountService: AccountsService) {}
  @Query(() => Account, { name: 'findOneById' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Account> {
    return await this.accountService.findOneById(id);
  }

  @Mutation(() => Account, { name: 'updateAccount' })
  public async updateAccount(
    @Args('updateInput', { type: () => UpdateAccountInput })
    updateInput: UpdateAccountInput,
  ): Promise<Account> {
    return await this.accountService.update(updateInput);
  }

  @Mutation(() => Account, { name: 'switchAccountActivation' })
  public async changeAccountStatus(
    @Args('updateInput', { type: () => UpdateAccountInput })
    updateInput: UpdateAccountInput,
  ): Promise<void> {
    return await this.accountService.accountStatus(updateInput);
  }
}
