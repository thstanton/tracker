import { Injectable } from '@nestjs/common';
import { DestinationsRepository } from './destinations.respository';
import { Destination } from '@prisma/client';

@Injectable()
export class DestinationsService {
  constructor(private repository: DestinationsRepository) {}

  async findOne(params: { slug: Destination['slug'] }) {
    const { slug } = params;
    const destination = await this.repository.findOne({ where: { slug } });
    return destination;
  }

  async getAll() {
    return this.repository.findAll({});
  }

  async create(params: {
    ipAddress: string;
    destination: string;
    identifier: string;
  }) {
    const { ipAddress, destination, identifier } = params;
    console.log(this.repository);
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
}
