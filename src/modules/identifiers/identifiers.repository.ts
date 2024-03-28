import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class IdentifiersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IdentifierWhereUniqueInput;
    where?: Prisma.IdentifierWhereInput;
    orderBy?: Prisma.IdentifierOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.identifier.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
