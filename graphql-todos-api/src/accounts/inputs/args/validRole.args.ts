import { Field } from '@nestjs/graphql';
import { ValidRole } from 'src/authentication/enums/valid-role.enum';

export class ValidRoleArgs {
  @Field(() => ValidRole, { nullable: true })
  role: ValidRole;
}
