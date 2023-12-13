import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TodoState } from '../enums/todoState.enum';

@InputType()
export class UpdateTodoInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Length(3, 25, {
    message: 'title should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @Length(10, 100, {
    message: 'Lastname should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  description: string;

  @IsOptional()
  @IsEnum(TodoState)
  @Field(() => TodoState)
  state: string;
}
