import { registerEnumType } from '@nestjs/graphql';

export enum ValidRole {
  admin = 'admin',
  user = 'user',
  superuser = 'Super User',
}
registerEnumType(ValidRole, { name: 'ValidRole' });
