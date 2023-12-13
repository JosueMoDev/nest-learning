import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { Account } from 'src/accounts/entity/account.entity';
import { CreateTodoInput } from './inputs/create-todo.input';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';

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
  public async findMany(@CurrentAccount() account: Account): Promise<Todo[]> {
    return await this.todoService.findMany(account);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  public async createTodo(
    @Args('createTodoInput', { type: () => CreateTodoInput })
    input: CreateTodoInput,
    @CurrentAccount() account: Account,
  ): Promise<Todo> {
    return await this.todoService.create(input, account);
  }
}
