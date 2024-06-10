import { Injectable } from '@nestjs/common';
import { Click, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ClickWithRelations } from 'src/database/types.module';

@Injectable()
export class ClicksRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.ClickCreateInput }): Promise<Click> {
    const { data } = params;
    return this.prisma.click.create({ data });
  }

  async getAll(
    params: Prisma.ClickFindManyArgs,
  ): Promise<ClickWithRelations[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.click.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async count(params: Prisma.ClickCountArgs) {
    const { where } = params;
    return this.prisma.click.count({ where });
  }

  async updateMany(params: Prisma.ClickUpdateManyArgs) {
    const { where, data } = params;
    return this.prisma.click.updateMany({ where, data });
  }

  async getChartData(params: { userId: number }) {
    const { userId } = params;
    const result: { date: string; count: number }[] = await this.prisma
      .$queryRaw`
      SELECT
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(*) as count
      FROM "Click"
      INNER JOIN "Destination" ON "destinationId" = "Destination"."id"
      WHERE "Destination"."userId" = ${userId}
      GROUP BY date
      ORDER BY date;
    `;
    return result.map(({ date, count }) => ({ date, count: Number(count) }));
  }

  async getChartDataByDestination(params: {
    userId: number;
    destinationId: number;
  }) {
    const { userId, destinationId } = params;
    const result: { date: string; count: number }[] = await this.prisma
      .$queryRaw`
      SELECT
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(*) as count
      FROM "Click"
      INNER JOIN "Destination" ON "destinationId" = "Destination"."id"
      WHERE "Destination"."userId" = ${userId}
      AND "Destination"."id" = ${destinationId}
      GROUP BY date
      ORDER BY date;
    `;
    return result.map(({ date, count }) => ({ date, count: Number(count) }));
  }
}
