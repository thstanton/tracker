import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private bcrypt: BcryptService,
  ) {}

  async findOne(params: { username: string }): Promise<User> {
    const { username } = params;
    console.log('Find One User: ' + username);
    const user = await this.repository.findOne({
      where: { username },
    });
    console.log('User: ' + user.id, user.email, user.password);
    return user;
  }

  async create(params: {
    email: string;
    username: string;
    password: string;
  }): Promise<User> {
    const { email, username, password } = params;
    const hashedPassword = await this.bcrypt.hash(password);
    return this.repository.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
  }

  async update(params: {
    email: string;
    username?: string;
    newEmail?: string;
  }): Promise<User> {
    const { email, username, newEmail } = params;
    return this.repository.update({
      where: { email },
      data: {
        username,
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
