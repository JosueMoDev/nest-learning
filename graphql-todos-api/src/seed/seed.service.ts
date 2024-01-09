import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entity/account.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { Repository } from 'typeorm';
import { SEED_ACCOUNTS, SEED_TODOS, SEED_LISTS } from './data/seed_data';
import { ListsService } from 'src/lists/lists.service';
import { ListTodosService } from 'src/list-todos/list-todos.service';
import { List } from 'src/lists/entities/list.entity';
import { ListTodo } from 'src/list-todos/entities/list-todo.entity';

@Injectable()
export class SeedService {
  private isProductionMode: boolean;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(ListTodo)
    private readonly listTodoRespository: Repository<ListTodo>,

    private readonly accountService: AccountsService,
    private readonly todoService: TodoService,
    private readonly listService: ListsService,
    private readonly listTodoService: ListTodosService,
  ) {
    this.isProductionMode = this.configService.get('MODE') === 'production';
  }
  async executeSeed() {
    if (this.isProductionMode)
      throw new UnauthorizedException(`Not avilable on production mode`);
    await this.deleteDataBase();
    const account = await this.loadAccounts();
    await this.loadTodos(account);
    const list = await this.loadLists(account);
    const todos = await this.todoService.findMany(
      account,
      {
        limit: 10,
        offset: 0,
      },
      {},
    );
    await this.loadListTodos(list, todos);
    return 'Done';
  }

  private async deleteDataBase() {
    await this.listTodoRespository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.listRepository.createQueryBuilder().delete().where({}).execute();
    await this.todoRepository.createQueryBuilder().delete().where({}).execute();
    await this.accountRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  private async loadAccounts(): Promise<Account> {
    const accounts = [];
    for (const accont of SEED_ACCOUNTS) {
      accounts.push(await this.accountService.create(accont));
    }
    return accounts[0];
  }

  private async loadTodos(account: Account): Promise<void> {
    const todosPromise = [];
    for (const todo of SEED_TODOS) {
      todosPromise.push(this.todoService.create(todo, account));
    }
    await Promise.all(todosPromise);
  }

  private async loadLists(account: Account): Promise<List> {
    const listPromise = [];
    for (const list of SEED_LISTS) {
      listPromise.push(this.listService.create(list, account));
    }
    return listPromise[0];
  }

  private async loadListTodos(list: List, todos: Todo[]): Promise<void> {
    const listTodosPromise = [];
    for (const todo of todos) {
      listTodosPromise.push(
        this.listTodoService.create({
          quantity: Math.round(Math.random() * 10),
          completed: Math.round(Math.random() * 1) === 0 ? false : true,
          listId: list.id,
          todoId: todo.id,
        }),
      );
    }
  }
}
