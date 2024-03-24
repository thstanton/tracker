import { Injectable } from '@nestjs/common';
import { Click, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClicksRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.ClickCreateInput }): Promise<Click> {
    const { data } = params;
    return this.prisma.click.create({ data });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClickWhereUniqueInput;
    where?: Prisma.ClickWhereInput;
    orderBy?: Prisma.ClickOrderByWithRelationInput;
  }): Promise<Click[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.click.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
