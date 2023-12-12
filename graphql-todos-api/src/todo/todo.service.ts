import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entity/account.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  public async findOneById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo) throw new NotFoundException('Any Todo Found');
    return todo;
  }

  public async findMany(account: Account): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: {
        account: {
          id: account.id,
        },
      },
    });
  }
}
