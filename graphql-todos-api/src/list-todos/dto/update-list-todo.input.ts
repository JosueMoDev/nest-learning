import { IsUUID } from 'class-validator';
import { CreateListTodoInput } from './create-list-todo.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateListTodoInput extends PartialType(CreateListTodoInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
