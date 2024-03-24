import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';

@Module({
  imports: [ApiModule, AuthModule, UsersModule, BcryptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
