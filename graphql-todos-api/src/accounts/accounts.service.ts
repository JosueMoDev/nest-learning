import { Injectable } from '@nestjs/common';
import { CreateAccountInput, UpdateAccountInput } from './inputs';
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

  public async create(input: CreateAccountInput): Promise<Account> {
    try {
      const newAccount = this.accountRespository.create(input);
      newAccount.password = bcrypt.hashSync(input.password, 10);
      const accountSaved = await this.accountRespository.save(newAccount);
      return accountSaved;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  public async update(input: UpdateAccountInput): Promise<Account> {
    try {
      const account = await this.accountRespository.preload(input);
      return await this.accountRespository.save(account);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async accountStatus(input: UpdateAccountInput): Promise<void> {
    try {
      const account = await this.findOneById(input.id);
      account.isActive = !account.isActive;
      const accountStatus = await this.accountRespository.preload(account);
      this.accountRespository.save(accountStatus);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
