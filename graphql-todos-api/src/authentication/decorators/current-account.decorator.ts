import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { ValidRole } from '../enums/valid-role.enum';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Account } from 'src/accounts/entity/account.entity';

export const CurrentAccount = createParamDecorator(
  (role: ValidRole, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const account: Account = ctx.getContext().req.account;
    if (!account) throw new InternalServerErrorException('No account provided');
    if (!role) return account;
    if (!ValidRole[role]) throw new ForbiddenException('Invalid Role');
  },
);
