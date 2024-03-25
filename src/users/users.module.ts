import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { BcryptModule } from 'src/auth/bcrypt/bcrypt.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule, BcryptModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
