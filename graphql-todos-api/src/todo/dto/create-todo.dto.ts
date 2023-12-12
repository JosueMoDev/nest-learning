import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTodo {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25, {
    message: 'title should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 100, {
    message: 'Lastname should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  description: string;
}
