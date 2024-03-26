import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  async validateUser(username: string, password: string) {
    const users: any[] = [
      {
        username: 'username',
        password: await argon.hash('password'),
        userId: '1',
      },
    ];

    const user = users.find((user: any) => user.username === username);

    const pwValid = await argon.verify(user.password, password);

    if (!pwValid) return null;

    return user;
  }

  async encodePassword(password: string): Promise<string> {
    console.log(password);

    const pw = await argon.hash(password, {});
    console.log(pw);
    return pw;
  }
}
