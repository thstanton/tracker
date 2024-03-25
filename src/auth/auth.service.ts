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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (user && (await this.bcrypt.compare(password, user.password))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async login(user: {
    username: string;
    id: number;
  }): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: {
    email: string;
    username: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const { email, username, password } = user;
    const createdUser = await this.usersService.create({
      email,
      username,
      password,
    });

    return this.login(createdUser);
  }
}
