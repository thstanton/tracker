import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IdentifiersModule } from './modules/identifiers/identifiers.module';
import { ClicksModule } from './modules/clicks/clicks.module';
import { DestinationsModule } from './modules/destinations/destinations.module';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    UsersModule,
    IdentifiersModule,
    ClicksModule,
    DestinationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
