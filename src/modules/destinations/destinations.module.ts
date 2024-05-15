import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { DestinationsRepository } from './destinations.repository';
import { DestinationsService } from './destinations.service';
import { BcryptModule } from 'src/auth/bcrypt/bcrypt.module';

@Module({
  imports: [PrismaModule, BcryptModule],
  providers: [DestinationsRepository, DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
