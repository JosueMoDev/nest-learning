import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListTodoInput } from './dto/create-list-todo.input';
import { UpdateListTodoInput } from './dto/update-list-todo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListTodo } from './entities/list-todo.entity';
import { Repository } from 'typeorm';
import { List } from 'src/lists/entities/list.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto';

@Injectable()
export class ListTodosService {
  constructor(
    @InjectRepository(ListTodo)
    private readonly listTodoRepository: Repository<ListTodo>,
  ) {}
  public async create(createListTodoInput: CreateListTodoInput) {
    const { listId, todoId, ...rest } = createListTodoInput;
    const newListTodo = this.listTodoRepository.create({
      ...rest,
      todo: { id: todoId },
      list: { id: listId },
    });
    await this.listTodoRepository.save(newListTodo);
    return await this.findOne(newListTodo.id);
  }

  public async findAll(
    list: List,
    pagination: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListTodo[]> {
    const { limit, offset } = pagination;
    const { search } = searchArgs;
    const queryBuilder = this.listTodoRepository
      .createQueryBuilder('listTodo')
      .innerJoin('listTodo.todo', 'todo')
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id });
    if (search) {
      queryBuilder.andWhere('LOWER(todo.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }
    return queryBuilder.getMany();
  }

  public async findOne(id: string) {
    const listTodo = await this.listTodoRepository.findOneBy({ id });
    if (!listTodo)
      throw new NotFoundException(`List item with id ${id} not found`);

    return listTodo;
  }

  public async update(
    id: string,
    updateListTodoInput: UpdateListTodoInput,
  ): Promise<ListTodo> {
    const { listId, todoId, ...rest } = updateListTodoInput;

    const queryBuilder = this.listTodoRepository
      .createQueryBuilder()
      .update()
      .set(rest)
      .where('id = :id', { id });

    if (listId) queryBuilder.set({ list: { id: listId } });
    if (todoId) queryBuilder.set({ todo: { id: todoId } });

    await queryBuilder.execute();

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} listTodo`;
  }

  public async listTodoCount(list: List): Promise<number> {
    return await this.listTodoRepository.count({
      where: { list: { id: list.id } },
    });
  }
}
