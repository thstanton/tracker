import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcrypt: BcryptService,
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
}
