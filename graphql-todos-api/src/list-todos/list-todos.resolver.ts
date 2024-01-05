import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListTodosService } from './list-todos.service';
import { ListTodo } from './entities/list-todo.entity';
import { CreateListTodoInput } from './dto/create-list-todo.input';
import { UpdateListTodoInput } from './dto/update-list-todo.input';

@Resolver(() => ListTodo)
export class ListTodosResolver {
  constructor(private readonly listTodosService: ListTodosService) {}

  @Mutation(() => ListTodo)
  createListTodo(@Args('createListTodoInput') createListTodoInput: CreateListTodoInput) {
    return this.listTodosService.create(createListTodoInput);
  }

  @Query(() => [ListTodo], { name: 'listTodos' })
  findAll() {
    return this.listTodosService.findAll();
  }

  @Query(() => ListTodo, { name: 'listTodo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listTodosService.findOne(id);
  }

  @Mutation(() => ListTodo)
  updateListTodo(@Args('updateListTodoInput') updateListTodoInput: UpdateListTodoInput) {
    return this.listTodosService.update(updateListTodoInput.id, updateListTodoInput);
  }

  @Mutation(() => ListTodo)
  removeListTodo(@Args('id', { type: () => Int }) id: number) {
    return this.listTodosService.remove(id);
  }
}
