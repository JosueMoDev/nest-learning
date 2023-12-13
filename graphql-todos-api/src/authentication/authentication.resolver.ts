import { CreateAccountInput } from 'src/accounts/inputs';
import { AuthenticationService } from './authentication.service';
import { LoginInput } from './inputs/login.input';
import { AccountAuthenticatedResponse } from './types/accountAuthenticatedResponse.type';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => AccountAuthenticatedResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AccountAuthenticatedResponse> {
    return this.authenticationService.login(loginInput);
  }

  @Mutation(() => AccountAuthenticatedResponse, { name: 'register' })
  async register(
    @Args('registerInput') registerInput: CreateAccountInput,
  ): Promise<AccountAuthenticatedResponse> {
    return this.authenticationService.register(registerInput);
  }
}
