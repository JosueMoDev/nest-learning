import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { JwtPayload } from '../interfaces/jwt.interface';
import { Account } from 'src/accounts/entity/account.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Account> {
    const { id } = payload;
    const account = await this.authenticationService.validate(id);
    return account;
  }
}
