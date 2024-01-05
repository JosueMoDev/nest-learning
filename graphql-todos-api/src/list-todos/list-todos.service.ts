import { Injectable } from '@nestjs/common';
import { CreateListTodoInput } from './dto/create-list-todo.input';
import { UpdateListTodoInput } from './dto/update-list-todo.input';

@Injectable()
export class ListTodosService {
  create(createListTodoInput: CreateListTodoInput) {
    return 'This action adds a new listTodo';
  }

  findAll() {
    return `This action returns all listTodos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listTodo`;
  }

  update(id: number, updateListTodoInput: UpdateListTodoInput) {
    return `This action updates a #${id} listTodo`;
  }

  remove(id: number) {
    return `This action removes a #${id} listTodo`;
  }
}
