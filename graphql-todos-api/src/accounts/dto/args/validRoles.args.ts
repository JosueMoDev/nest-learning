import { Field } from '@nestjs/graphql';
import { ValidRoles } from 'src/authentication/enums/valid-roles.enum';

export class ValidRolesArgs {
  @Field(() => ValidRoles, { nullable: true })
  role: ValidRoles;
}
