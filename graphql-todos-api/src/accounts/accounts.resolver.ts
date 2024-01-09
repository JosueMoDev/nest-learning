import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Account } from './entity/account.entity';
import { AccountsService } from './accounts.service';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UpdateAccountInput } from './inputs';
import { List } from 'src/lists/entities/list.entity';
import { ListsService } from 'src/lists/lists.service';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { PaginationArgs, SearchArgs } from 'src/common/dto';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { ValidRole } from 'src/authentication/enums/valid-role.enum';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/entities/todo.entity';

@Resolver(() => Account)
@UseGuards(JwtAuthenticationGuard)
export class AccountsResolver {
  constructor(
    private readonly accountService: AccountsService,
    private readonly listService: ListsService,
    private readonly todoservice: TodoService,
  ) {}
  @Query(() => Account, { name: 'findOneById' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Account> {
    return await this.accountService.findOneById(id);
  }

  @Query(() => [Account], { name: 'findManyAccout' })
  public async findMany(): Promise<Account[]> {
    return this.accountService.findMany();
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

  @ResolveField(() => [List], { name: 'lists' })
  async getListByAccount(
    @CurrentAccount() accountAdmin: Account,
    @Parent() account: Account,
    @Args() pagination: PaginationArgs,
    @Args() search: SearchArgs,
  ): Promise<List[]> {
    return this.listService.findMany(account, pagination, search);
  }

  @ResolveField(() => [Todo], { name: 'todos' })
  async getTodosByAccount(
    @CurrentAccount(ValidRole.admin) accountAdmin: Account,
    @Parent() account: Account,
    @Args() pagination: PaginationArgs,
    @Args() search: SearchArgs,
  ): Promise<Todo[]> {
    return this.todoservice.findMany(account, pagination, search);
  }

  @ResolveField(() => Int, { name: 'todosCount' })
  async getTodosCount(@Parent() account: Account): Promise<number> {
    return this.todoservice.todoCount(account);
  }
  @ResolveField(() => Int, { name: 'listsCount' })
  async getListsCount(@Parent() account: Account): Promise<number> {
    return this.listService.listCount(account);
  }
}
