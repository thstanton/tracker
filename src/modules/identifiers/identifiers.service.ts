import { Injectable } from '@nestjs/common';
import { IdentifiersRepository } from './identifiers.repository';

@Injectable()
export class IdentifiersService {
  constructor(private repository: IdentifiersRepository) {}

  async getAll(params: { userId: number }) {
    const { userId } = params;
    return this.repository.findMany({
      where: {
        clicks: {
          some: {
            destination: {
              owner: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }
}
