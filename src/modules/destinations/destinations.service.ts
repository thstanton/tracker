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
}
