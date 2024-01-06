import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateListTodoInput {
  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsNumber()
  @IsOptional()
  quantity: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @Field(() => ID)
  @IsUUID()
  listId: string;

  @Field(() => ID)
  @IsUUID()
  todoId: string;
}
