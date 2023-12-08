import { CreateAccount } from 'src/accounts/dto';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { AccountAuthenticatedResponse } from './types/accountAuthenticatedResponse.type';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => AccountAuthenticatedResponse, { name: 'login' })
  async login(
    @Args('loginInputs') loginDto: LoginDto,
  ): Promise<AccountAuthenticatedResponse> {
    return this.authenticationService.login(loginDto);
  }

  @Mutation(() => AccountAuthenticatedResponse, { name: 'register' })
  async register(
    @Args('registerInputs') registerDto: CreateAccount,
  ): Promise<AccountAuthenticatedResponse> {
    return this.authenticationService.register(registerDto);
  }
}
