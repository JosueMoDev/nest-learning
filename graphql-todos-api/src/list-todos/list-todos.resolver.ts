import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ListTodosService } from './list-todos.service';
import { ListTodo } from './entities/list-todo.entity';
import { CreateListTodoInput } from './dto/create-list-todo.input';
import { UpdateListTodoInput } from './dto/update-list-todo.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';

@Resolver(() => ListTodo)
@UseGuards(JwtAuthenticationGuard)
export class ListTodosResolver {
  constructor(private readonly listTodosService: ListTodosService) {}

  @Mutation(() => ListTodo)
  createListTodo(
    @Args('createListTodoInput') createListTodoInput: CreateListTodoInput,
  ) {
    return this.listTodosService.create(createListTodoInput);
  }

  // @Query(() => [ListTodo], { name: 'listTodos' })
  // public async findAll(list: List) {
  //   return this.listTodosService.findAll(list);
  // }

  @Query(() => ListTodo, { name: 'listTodo' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.listTodosService.findOne(id);
  }

  @Mutation(() => ListTodo)
  updateListTodo(
    @Args('updateListTodoInput') updateListTodoInput: UpdateListTodoInput,
  ) {
    return this.listTodosService.update(
      updateListTodoInput.id,
      updateListTodoInput,
    );
  }

  @Mutation(() => ListTodo)
  removeListTodo(@Args('id', { type: () => ID }) id: string) {
    return this.listTodosService.remove(id);
  }
}
