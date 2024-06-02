import { Injectable } from '@nestjs/common';
import { ClicksRepository } from './clicks.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClicksService {
  constructor(private repository: ClicksRepository) {}

  async create(params: {
    ipAddress: string;
    destination: string;
    identifier?: string;
  }) {
    const { ipAddress, destination, identifier } = params;
    const data: Prisma.ClickCreateInput = {
      ipAddress,
      destination: {
        connect: {
          slug: destination,
        },
      },
    };

    if (identifier) {
      data.identifier = {
        connectOrCreate: {
          where: {
            name: identifier,
          },
          create: {
            name: identifier,
          },
        },
      };
    }

    return this.repository.create({ data });
  }

  async getAll(params: { userId: number }) {
    const { userId } = params;
    return this.repository.getAll({
      where: {
        destination: {
          owner: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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

  async getChartData(params: { userId: number }) {
    const { userId } = params;
    const clicks = await this.repository.getAll({
      where: {
        destination: {
          owner: {
            id: userId,
          },
        },
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 365)),
        },
      },
    });
    const data: { date: Date; count: number }[] = [];
    const day = 24 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      data.push({ date: new Date(today.getTime() - i * day), count: 0 });
    }
    for (const click of clicks) {
      const date = new Date(click.createdAt);
      const index = data.findIndex((d) => d.date.getDate() === date.getDate());
      if (index !== -1) {
        data[index].count++;
      }
    }
    return data;
  }

  async getUnreadCount(params: { userId: number }) {
    const { userId } = params;
    return this.repository.count({
      where: {
        destination: {
          owner: {
            id: userId,
          },
        },
        isRead: false,
      },
    });
  }

  async markAsRead(params: { userId: number }) {
    const { userId } = params;
    return this.repository.updateMany({
      where: {
        destination: {
          owner: {
            id: userId,
          },
        },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}
