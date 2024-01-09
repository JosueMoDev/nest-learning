import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TodoState } from '../enums/todoState.enum';

@InputType()
export class ChangeTodoState {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsNotEmpty()
  @IsEnum(TodoState)
  @Field(() => TodoState)
  state: string;
}
