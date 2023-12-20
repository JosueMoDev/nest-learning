import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';

@Module({
  providers: [AccountsResolver, AccountsService],
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule {}
