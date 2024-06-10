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

  async getChartData(params: { userId: number; destinationId?: number }) {
    const { userId, destinationId } = params;
    const data: { date: string; count: number }[] = destinationId
      ? await this.repository.getChartDataByDestination({
          userId,
          destinationId,
        })
      : await this.repository.getChartData({ userId });

    const today = new Date().getTime();
    const day = 24 * 60 * 60 * 1000;
    const firstClick = new Date(data[0].date).getTime();
    const daysSinceFirstClick = Math.floor((today - firstClick) / day);
    const length = daysSinceFirstClick > 365 ? daysSinceFirstClick : 365;
    const dataMap = new Map<string, { date: Date; count: number }>();
    for (let i = 0; i < length; i++) {
      const date = new Date(today - (length - i) * day);
      date.setHours(0, 0, 0, 0);
      const dateString = date.toISOString().split('T')[0];
      dataMap.set(dateString, { date, count: 0 });
    }

    data.forEach((record) => {
      const date = new Date(record.date);
      const dateString = date.toISOString().split('T')[0];
      if (dataMap.has(dateString)) {
        dataMap.get(dateString).count = record.count;
      }
    });

    return Array.from(dataMap.values());
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
