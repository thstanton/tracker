import { Injectable } from '@nestjs/common';
import { Click, Destination, Identifier, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

Injectable();
export class ClicksService {
  constructor(private prisma: PrismaService) {}

  async create(params: {
    ipAddress: Click['ipAddress'];
    destination: Destination['slug'];
    identifier: Identifier['name'];
  }): Promise<Click> {
    const { ipAddress, destination, identifier } = params;
    const data: Prisma.ClickCreateInput = {
      ipAddress,
      destination: {
        connect: {
          slug: destination,
        },
      },
      identifier: {
        connectOrCreate: {
          where: {
            name: identifier,
          },
          create: {
            name: identifier,
          },
        },
      },
    };
    console.log(this.prisma);
    const response = this.prisma.click.create({ data });
    console.log(response);
    return response;
  }

  async getAll() {
    const clicks = await this.prisma.click.findMany();
    return clicks;
  }
}
