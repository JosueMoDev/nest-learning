import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './entity/account.entity';
import { AccountsService } from './accounts.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateAccount } from './dto';

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
    @Args('updateDto', { type: () => UpdateAccount }) dto: UpdateAccount,
  ): Promise<Account> {
    return await this.accountService.update(dto);
  }

  @Mutation(() => Account, { name: 'switchAccountActivation' })
  public async changeAccountStatus(
    @Args('updateDto', { type: () => UpdateAccount }) dto: UpdateAccount,
  ): Promise<void> {
    return await this.accountService.accountStatus(dto);
  }
}
