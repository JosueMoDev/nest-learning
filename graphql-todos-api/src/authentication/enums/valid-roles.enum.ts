import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  superuser = 'Super User',
}
registerEnumType(ValidRoles, { name: 'ValidRoles' });
