import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MagicLinkStrategy } from './magic-link/magic-link.strategy';
import { ResendService } from './resend/resend.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    BcryptModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    MagicLinkStrategy,
    ResendService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
