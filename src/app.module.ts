import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './auth/bcrypt/bcrypt.module';
import { IdentifiersModule } from './modules/identifiers/identifiers.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    UsersModule,
    BcryptModule,
    IdentifiersModule,
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
