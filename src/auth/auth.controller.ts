import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Req() req: Request, @Session() session: SessionData) {
    console.log('session.user');
    console.log(session.user);
    session.user = {
      userId: req.user.userId,
      username: req.user.username,
      roles: req.user.roles,
    };

    return {
      status: HttpStatus.OK,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        resolve({
          status: 204,
          message: 'Session destroyed',
        });
      });
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/encode')
  async encode(@Req() req: Request, @Body('password') password: string) {
    return {
      encoded: await this.authService.encodePassword(password),
    };
  }
}
