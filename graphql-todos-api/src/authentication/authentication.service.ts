import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  async login(): Promise<any> {
    throw 'no implemented';
  }

  refreshToken(): any {
    throw 'no implemented';
  }
}
