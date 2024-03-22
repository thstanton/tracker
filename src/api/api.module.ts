import { Module } from '@nestjs/common';
import { ClicksModule } from 'src/modules/clicks/clicks.module';
import { ApiController } from './api.controller';
import { DestinationsModule } from 'src/modules/destinations/destinations.module';

@Module({
  imports: [ClicksModule, DestinationsModule],
  controllers: [ApiController],
})
export class ApiModule {}
