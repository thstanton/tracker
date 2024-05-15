import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { DestinationsRepository } from './destinations.repository';
import { DestinationsService } from './destinations.service';

@Module({
  imports: [PrismaModule],
  providers: [DestinationsRepository, DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
