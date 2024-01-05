import { CreateListTodoInput } from './create-list-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateListTodoInput extends PartialType(CreateListTodoInput) {
  @Field(() => Int)
  id: number;
}
