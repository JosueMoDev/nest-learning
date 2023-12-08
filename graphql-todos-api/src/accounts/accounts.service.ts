import { Injectable } from '@nestjs/common';
import { CreateAccount, UpdateAccount } from './dto';
import { Account } from './entity/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRespository: Repository<Account>,
  ) {}
  public async findMany(): Promise<Account[]> {
    try {
      return this.accountRespository.find();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async findAccountByEmail(email: string): Promise<Account> {
    try {
      return this.accountRespository.findOneBy({ email: email });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async findOneById(id: string): Promise<Account> {
    try {
      return this.accountRespository.findOneBy({ id: id });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async create(dto: CreateAccount): Promise<Account> {
    try {
      const newAccount = this.accountRespository.create(dto);
      newAccount.password = bcrypt.hashSync(dto.password, 10);
      const accountSaved = await this.accountRespository.save(newAccount);
      return accountSaved;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  public async update(dto: UpdateAccount): Promise<Account> {
    try {
      const account = await this.accountRespository.preload(dto);
      return await this.accountRespository.save(account);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async accountStatus(): Promise<any> {
    throw 'Not implemented';
  }

  public async delete(id: string): Promise<any> {
    throw 'not implemented';
  }
}
