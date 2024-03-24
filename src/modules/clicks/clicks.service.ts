import { Injectable } from '@nestjs/common';
import { ClicksRepository } from './clicks.repository';

@Injectable()
export class ClicksService {
  constructor(private repository: ClicksRepository) {}

  async create(params: {
    ipAddress: string;
    destination: string;
    identifier: string;
  }) {
    const { ipAddress, destination, identifier } = params;
    return this.repository.create({
      data: {
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
      },
    });
  }

  async getAll(userId: number) {
    return this.repository.getAll({
      where: {
        destination: {
          owner: {
            id: userId,
          },
        },
      },
      orderBy: {
        destinationId: 'asc',
        identifierId: 'asc',
      },
      include: {
        identifier: true,
        destination: {
          select: {
            name: true,
            url: true,
          },
        },
      },
    });
  }
}
