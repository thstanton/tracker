import { Prisma } from '@prisma/client';

export type ClickWithRelations = Prisma.ClickGetPayload<{
  include: { destination: true; identifier: true };
}>;
