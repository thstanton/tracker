import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;
    return this.prisma.user.findFirst({ where });
  }

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    return this.prisma.user.create(params);
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prisma.user.update(params);
  }

  async delete(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    return this.prisma.user.delete(params);
  }
}
