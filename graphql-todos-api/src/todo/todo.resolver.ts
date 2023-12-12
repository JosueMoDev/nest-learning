import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CurrentAccount } from 'src/authentication/decorators/current-account.decorator';
import { Account } from 'src/accounts/entity/account.entity';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => Todo, { name: 'findOneBy' })
  public async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Todo> {
    return this.todoService.findOneById(id);
  }
  @Query(() => [Todo], { name: 'findMany' })
  public async findMany(@CurrentAccount() account: Account): Promise<Todo[]> {
    return this.todoService.findMany(account);
  }
}
