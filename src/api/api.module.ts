import { Module } from '@nestjs/common';
import { ClicksModule } from 'src/modules/clicks/clicks.module';
import { ApiController } from './api.controller';
import { DestinationsModule } from 'src/modules/destinations/destinations.module';
import { AuthModule } from 'src/auth/auth.module';
import { IdentifiersModule } from 'src/modules/identifiers/identifiers.module';

@Module({
  imports: [ClicksModule, DestinationsModule, IdentifiersModule, AuthModule],
  controllers: [ApiController],
})
export class ApiModule {}
