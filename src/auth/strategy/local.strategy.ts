import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Role } from '../enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('validating user');
    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    const userRole = Role.PROFESSIONAL;
    console.log('validated');
    return {
      userId: user.userId,
      username: user.username,
      roles: [userRole],
    };
  }
}
