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
    include?: Prisma.DestinationInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.destination.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async create(params: {
    data: Prisma.DestinationCreateInput;
  }): Promise<Destination> {
    const { data } = params;
    return this.prisma.destination.create({ data });
  }

  async delete(params: {
    where: Prisma.DestinationWhereUniqueInput;
  }): Promise<Destination> {
    const { where } = params;
    return this.prisma.destination.delete({
      where,
    });
  }

  async update(params: {
    where: Prisma.DestinationWhereUniqueInput;
    data: Prisma.DestinationUpdateInput;
  }): Promise<Destination> {
    const { where, data } = params;
    return this.prisma.destination.update({
      where,
      data,
    });
  }
}
