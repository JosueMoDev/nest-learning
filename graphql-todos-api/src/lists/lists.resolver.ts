import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { Account } from 'src/accounts/entity/account.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { ListTodo } from 'src/list-todos/entities/list-todo.entity';
import { ListTodosService } from 'src/list-todos/list-todos.service';

@Resolver(() => List)
@UseGuards(JwtAuthenticationGuard)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listTodoService: ListTodosService,
  ) {}

  @Mutation(() => List)
  createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentAccount() account: Account,
  ) {
    return this.listsService.create(createListInput, account);
  }

  @Query(() => [List], { name: 'lists' })
  findAll(
    @Args() pagination: PaginationArgs,
    @Args() search: SearchArgs,
    @CurrentAccount() account: Account,
  ) {
    return this.listsService.findMany(account, pagination, search);
  }

  @Query(() => List, { name: 'list' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentAccount() account: Account,
  ) {
    return this.listsService.findOne(id, account);
  }

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentAccount() account: Account,
  ) {
    return this.listsService.update(updateListInput, account);
  }

  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentAccount() account: Account,
  ) {
    return this.listsService.remove(id, account);
  }

  @ResolveField(() => [ListTodo], { name: 'todos' })
  public async getListTodos(
    @Parent() list: List,
    @Args() pagination: PaginationArgs,
    @Args() search: SearchArgs,
  ): Promise<ListTodo[]> {
    return await this.listTodoService.findAll(list, pagination, search);
  }

  @ResolveField(() => Int, { name: 'listTodoCount' })
  public async getCountListTodo(@Parent() list: List): Promise<number> {
    return await this.listTodoService.listTodoCount(list);
  }
}
