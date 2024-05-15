import { Injectable } from '@nestjs/common';
import { DestinationsRepository } from './destinations.repository';
import { Destination } from '@prisma/client';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';

@Injectable()
export class DestinationsService {
  constructor(
    private repository: DestinationsRepository,
    private bcrypt: BcryptService,
  ) {}

  async findOne(params: {
    slug: Destination['slug'];
    userId: Destination['userId'];
  }) {
    const { slug, userId } = params;
    const destination = await this.repository.findOne({
      where: { owner: { id: userId }, slug },
    });
    return destination;
  }

  async findOneById(params: {
    id: Destination['id'];
    userId: Destination['userId'];
  }) {
    const { id, userId } = params;
    return this.repository.findOne({ where: { id, userId } });
  }

  async getAll(params: { userId: Destination['userId'] }) {
    const { userId } = params;
    return this.repository.findAll({
      where: { userId },
      include: {
        clicks: {
          include: { identifier: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { clicks: true },
        },
      },
    });
  }

  async create(params: {
    url: Destination['url'];
    userId: Destination['userId'];
    name: Destination['name'];
  }) {
    const { url, userId, name } = params;
    const slug = await this.bcrypt.hash(url);
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

  async delete(params: { id: Destination['id'] }): Promise<Destination> {
    const { id } = params;
    return this.repository.delete({ where: { id } });
  }

  async update(params: {
    id: Destination['id'];
    slug: Destination['slug'];
    name: Destination['name'];
    url: Destination['url'];
  }): Promise<Destination> {
    const { id, slug, name, url } = params;
    return this.repository.update({
      where: { id },
      data: { slug, name, url },
    });
  }
}
