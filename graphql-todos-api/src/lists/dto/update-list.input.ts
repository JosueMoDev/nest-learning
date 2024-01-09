import { IsString, IsUUID } from 'class-validator';
import { CreateListInput } from './create-list.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @IsString()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
