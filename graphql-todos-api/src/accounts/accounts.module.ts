import { Module, ParseUUIDPipe } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Args, ID, Query } from '@nestjs/graphql';

@Module({
  providers: [AccountsResolver, AccountsService],
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [AccountsService],
})
export class AccountsModule {
  constructor(private readonly accountService: AccountsService) {}
  @Query(() => Account, { name: 'account' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    // @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) account: Account,
  ): Promise<Account> {
    return this.accountService.findOneById(id);
  }
}
