import { Module } from '@nestjs/common';
import { ClicksRepository } from './clicks.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ClicksService } from './clicks.service';
import { ClicksController } from './clicks.controller';
import { DestinationsModule } from '../destinations/destinations.module';

@Module({
  imports: [PrismaModule, DestinationsModule],
  providers: [ClicksRepository, ClicksService],
  exports: [ClicksService],
  controllers: [ClicksController],
})
export class ClicksModule {}
