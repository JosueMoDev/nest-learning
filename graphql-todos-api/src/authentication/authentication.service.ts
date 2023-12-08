import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountAuthenticatedResponse } from './types/accountAuthenticatedResponse.type';
import { AccountsService } from 'src/accounts/accounts.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateAccount } from 'src/accounts/dto';
import { Account } from 'src/accounts/entity/account.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async login(dto: LoginDto): Promise<AccountAuthenticatedResponse> {
    const account = await this.accountService.findAccountByEmail(dto.email);
    if (!account) throw new NotFoundException('No account found');
    if (!bcrypt.compareSync(dto.password, account.password))
      throw new BadRequestException('Incorrect credentials');

    const token = this.generateToken(account.id);
    return {
      account: account,
      token: token,
    };
  }

  async register(dto: CreateAccount): Promise<AccountAuthenticatedResponse> {
    const account = await this.accountService.create(dto);
    if (!account) throw new InternalServerErrorException('Something happend');
    const token = this.generateToken(account.id);

    return { account: account, token: token };
  }

  refreshToken(): any {
    throw 'no implemented';
  }

  async validate(id: string): Promise<Account> {
    const account = await this.accountService.findOneById(id);
    if (!account.isActive) throw new UnauthorizedException('Account Inactive');
    delete account.password;
    return account;
  }
}
