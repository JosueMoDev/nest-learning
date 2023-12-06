import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Query(() => String)
  findMany(): Promise<string> {
    return this.authenticationService.login();
  }
}
