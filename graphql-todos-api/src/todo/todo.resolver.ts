import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { Account } from 'src/accounts/entity/account.entity';
import { CreateTodoInput } from './inputs/create-todo.input';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { UpdateTodoInput } from './inputs/update-todo.input';
import { ChangeTodoState } from './inputs/change-todo-state.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto';

@Resolver(() => Todo)
@UseGuards(JwtAuthenticationGuard)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => Todo, { name: 'findOneBy' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentAccount() account: Account,
  ): Promise<Todo> {
    return await this.todoService.findOneById(id, account);
  }
  @Query(() => [Todo], { name: 'findMany' })
  public async findMany(
    @CurrentAccount() account: Account,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Todo[]> {
    return await this.todoService.findMany(account, paginationArgs, searchArgs);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  public async createTodo(
    @CurrentAccount() account: Account,
    @Args('createTodoInput', { type: () => CreateTodoInput })
    input: CreateTodoInput,
  ): Promise<Todo> {
    return await this.todoService.create(input, account);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  public async updateTodo(
    @CurrentAccount() account: Account,
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    input: UpdateTodoInput,
  ): Promise<Todo> {
    return await this.todoService.update(input, account);
  }

  @Mutation(() => Todo, { name: 'changeStateTodo' })
  public async changeState(
    @CurrentAccount() account: Account,
    @Args('changeTodoState', { type: () => ChangeTodoState })
    input: ChangeTodoState,
  ): Promise<Todo> {
    return await this.todoService.changeState(input, account);
  }
}
