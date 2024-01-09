import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListTodosModule } from 'src/list-todos/list-todos.module';

@Module({
  providers: [ListsResolver, ListsService],
  imports: [TypeOrmModule.forFeature([List]), ListTodosModule],
  exports: [TypeOrmModule, ListsService],
})
export class ListsModule {}
