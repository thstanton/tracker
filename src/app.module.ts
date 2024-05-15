import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './auth/bcrypt/bcrypt.module';
import { IdentifiersModule } from './modules/identifiers/identifiers.module';
import { AppController } from './app.controller';
import { ClicksModule } from './modules/clicks/clicks.module';
import { DestinationsModule } from './modules/destinations/destinations.module';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    UsersModule,
    BcryptModule,
    IdentifiersModule,
    ClicksModule,
    DestinationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
