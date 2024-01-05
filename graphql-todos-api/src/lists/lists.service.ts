import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entity/account.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  public async create(
    createListInput: CreateListInput,
    account: Account,
  ): Promise<List> {
    const newList = this.listRepository.create({ ...createListInput, account });
    return await this.listRepository.save(newList);
  }

  public async findMany(
    account: Account,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    const queryBuilder = this.listRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"accountId" = :accountId`, { accountId: account.id });

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return queryBuilder.getMany();
  }

  public async findOne(id: string, account: Account): Promise<List> {
    const list = await this.listRepository.findOneBy({
      id: id,
      account: { id: account.id },
    });
    if (!list) throw new NotFoundException('Any List Found');
    return list;
  }

  public async update(updateListInput: UpdateListInput, account: Account) {
    const list = await this.findOne(updateListInput.id, account);
    const listUpdated = await this.listRepository.preload({
      ...list,
      ...updateListInput,
    });
    return await this.listRepository.save(listUpdated);
  }

  public async remove(id: string, account: Account): Promise<List> {
    const list = await this.findOne(id, account);
    await this.listRepository.remove(list);
    return { ...list, id };
  }
}
