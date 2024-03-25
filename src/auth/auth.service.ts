import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Prisma.UserGetPayload<{ select: { password: false } }>> {
    const user = await this.usersService.findOne({ email });
    if (user && (await this.bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
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
    const createdUser = await this.usersService.create({
      email: user.email,
      username: user.username,
      password: user.password,
    });

    return this.login(createdUser);
  }
}
