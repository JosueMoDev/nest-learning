import { Module } from '@nestjs/common';
import { ListTodosService } from './list-todos.service';
import { ListTodosResolver } from './list-todos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListTodo } from './entities/list-todo.entity';

@Module({
  providers: [ListTodosResolver, ListTodosService],
  imports: [TypeOrmModule.forFeature([ListTodo])],
  exports: [TypeOrmModule, ListTodosService],
})
export class ListTodosModule {}
