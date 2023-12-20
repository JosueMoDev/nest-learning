import { Module } from '@nestjs/common';
import { SeedResolver } from './seed.resolver';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from 'src/todo/todo.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, TodoModule, AccountsModule],
})
export class SeedModule {}
