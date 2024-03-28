import { Module } from '@nestjs/common';
import { IdentifiersService } from './identifiers.service';
import { PrismaModule } from 'src/database/prisma.module';
import { IdentifiersRepository } from './identifiers.repository';

@Module({
  imports: [PrismaModule],
  providers: [IdentifiersService, IdentifiersRepository],
  exports: [IdentifiersService],
})
export class IdentifiersModule {}
