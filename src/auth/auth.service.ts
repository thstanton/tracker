import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && (await this.bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByMagicLink(email: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: {
    email: string;
    id: number;
  }): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const { email, password } = user;
    const createdUser = await this.usersService.create({
      email,
      password,
    });

    return this.login(createdUser);
  }
}
