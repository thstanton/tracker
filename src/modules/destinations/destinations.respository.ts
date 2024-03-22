import { Injectable } from '@nestjs/common';
import { Destination } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DestinationsRepository {
  constructor(private prisma: PrismaService) {}
  async findOne(params: { where: { slug: string } }): Promise<Destination> {
    const { where } = params;
    return this.prisma.destination.findUnique({
      where,
    });
  }
}
