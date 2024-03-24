import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';

@Module({
  imports: [UsersModule, BcryptModule],
  providers: [AuthService],
})
export class AuthModule {}
