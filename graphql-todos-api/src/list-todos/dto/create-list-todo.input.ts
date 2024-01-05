import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateListTodoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
