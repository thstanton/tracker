import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { ClicksModule } from 'src/modules/clicks/clicks.module';
import { DestinationsModule } from 'src/modules/destinations/destinations.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ClicksModule, DestinationsModule, AuthModule],
  controllers: [LinkController],
})
export class LinkModule {}
