import { Injectable } from '@nestjs/common';
import { Destination, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DestinationsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    where: Prisma.DestinationWhereUniqueInput;
  }): Promise<Destination> {
    const { where } = params;
    return this.prisma.destination.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DestinationWhereUniqueInput;
    where?: Prisma.DestinationWhereInput;
    orderBy?: Prisma.DestinationOrderByWithRelationInput;
  }): Promise<Destination[]> {
    const { skip, take, cursor, where, orderBy } = params;
    console.log(this.prisma);
    return this.prisma.destination.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(params: {
    data: Prisma.DestinationCreateInput;
  }): Promise<Destination> {
    const { data } = params;
    return this.prisma.destination.create({ data });
  }
}
