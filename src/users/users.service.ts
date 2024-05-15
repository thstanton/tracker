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

  async findOne(params: { email: string }): Promise<User> {
    const { email } = params;
    console.log('Find One User: ' + email);
    const user = await this.repository.findOne({
      where: { email },
    });
    console.log('User: ' + user.id, user.email, user.password);
    return user;
  }

  async create(params: { email: string; password: string }): Promise<User> {
    const { email, password } = params;
    const hashedPassword = await this.bcrypt.hash(password);
    return this.repository.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async update(params: { email: string; newEmail?: string }): Promise<User> {
    const { email, newEmail } = params;
    return this.repository.update({
      where: { email },
      data: {
        email: newEmail,
      },
    });
  }

  async updatePassword(params: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<User> {
    const { email, oldPassword, newPassword } = params;
    const user = await this.repository.findOne({
      where: { email },
    });
    if (!(await this.bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Incorrect password');
    }
    const hashedPassword = await this.bcrypt.hash(newPassword);
    return this.repository.update({
      where: { email },
      data: {
        password: hashedPassword,
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
