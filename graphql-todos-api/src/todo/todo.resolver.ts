import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { Account } from 'src/accounts/entity/account.entity';
import { CreateTodo } from './dto/create-todo.dto';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => Todo, { name: 'findOneBy' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Todo> {
    return await this.todoService.findOneById(id);
  }
  @Query(() => [Todo], { name: 'findMany' })
  public async findMany(@CurrentAccount() account: Account): Promise<Todo[]> {
    return await this.todoService.findMany(account);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  public async createTodo(
    @Args('todoDto', { type: () => CreateTodo }) dto: CreateTodo,
    @CurrentAccount() account: Account,
  ): Promise<Todo> {
    return await this.todoService.create(dto, account);
  }
}
