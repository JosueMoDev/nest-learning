import { registerEnumType } from '@nestjs/graphql';

export enum TodoState {
  done = 'done',
  pending = 'pendig',
  inpause = 'in pause',
}
registerEnumType(TodoState, { name: 'TodoState' });
