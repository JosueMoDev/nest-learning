import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { TodoModule } from 'src/todo/todo.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  providers: [AccountsResolver, AccountsService],
  imports: [TypeOrmModule.forFeature([Account]), TodoModule, ListsModule],
  exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule {}
