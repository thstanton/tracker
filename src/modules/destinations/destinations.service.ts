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

  async getAll(params: { userId: Destination['userId'] }) {
    const { userId } = params;
    return this.repository.findAll({
      where: { userId },
    });
  }

  async create(params: {
    url: Destination['url'];
    userId: Destination['userId'];
    slug: Destination['slug'];
    name: Destination['name'];
  }) {
    const { url, userId, slug, name } = params;
    return this.repository.create({
      data: {
        url,
        slug,
        name,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
