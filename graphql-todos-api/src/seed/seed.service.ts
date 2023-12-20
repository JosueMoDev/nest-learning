import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entity/account.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { Repository } from 'typeorm';
import { SEED_ACCOUNTS, SEED_TODOS } from './data/seed_data';

@Injectable()
export class SeedService {
  private isProductionMode: boolean;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly accountService: AccountsService,
    private readonly todoService: TodoService,
  ) {
    this.isProductionMode = this.configService.get('MODE') === 'production';
  }
  async executeSeed() {
    if (this.isProductionMode)
      throw new UnauthorizedException(`Not avilable on production mode`);
    await this.deleteDataBase();
    const accounts = await this.loadAccounts();
    await this.loadTodos(accounts);
    return 'Done';
  }

  private async deleteDataBase() {
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
}
