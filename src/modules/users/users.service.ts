import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private bcrypt: BcryptService,
  ) {}

  async findOne(params: { email: string }): Promise<User> {
    return this.repository.findOne({
      where: { email: params.email },
    });
  }

  async create(params: {
    email: string;
    userName: string;
    password: string;
  }): Promise<User> {
    const { email, userName, password } = params;
    const hashedPassword = await this.bcrypt.hash(password);
    return this.repository.create({
      data: {
        email,
        userName,
        password: hashedPassword,
      },
    });
  }

  async update(params: {
    email: string;
    userName?: string;
    newEmail?: string;
  }): Promise<User> {
    const { email, userName, newEmail } = params;
    return this.repository.update({
      where: { email },
      data: {
        userName,
        email: newEmail,
      },
    });
  }

  async delete(params: { email: string }): Promise<User> {
    const { email } = params;
    return this.repository.delete({
      where: { email },
    });
  }
}
