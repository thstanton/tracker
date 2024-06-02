import { Injectable } from '@nestjs/common';
import { Click, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ClickWithRelations } from 'src/database/types.module';

@Injectable()
export class ClicksRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.ClickCreateInput }): Promise<Click> {
    const { data } = params;
    return this.prisma.click.create({ data });
  }

  async getAll(
    params: Prisma.ClickFindManyArgs,
  ): Promise<ClickWithRelations[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.click.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async count(params: Prisma.ClickCountArgs) {
    const { where } = params;
    return this.prisma.click.count({ where });
  }

  async updateMany(params: Prisma.ClickUpdateManyArgs) {
    const { where, data } = params;
    return this.prisma.click.updateMany({ where, data });
  }
}
