import { Module } from '@nestjs/common';
import { ClicksRepository } from './clicks.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ClicksService } from './clicks.service';

@Module({
  imports: [PrismaModule],
  providers: [ClicksService, ClicksRepository],
  exports: [ClicksService],
})
export class ClicksModule {}
