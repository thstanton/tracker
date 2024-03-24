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

  async getAll() {
    return this.repository.getAll({});
  }
}
