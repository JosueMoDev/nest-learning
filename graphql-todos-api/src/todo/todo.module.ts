import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  providers: [TodoResolver, TodoService],
  imports: [TypeOrmModule.forFeature([Todo])],
  exports: [TodoService, TypeOrmModule],
})
export class TodoModule {}
