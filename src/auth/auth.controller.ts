import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard, GuardedRequest } from './passport/local-auth.guard';
import { AuthService } from './auth.service';
import { MagicLinkStrategy } from './passport/magic-link.strategy';
import { Request, Response } from 'express';
import { MagicLinkDto } from './magic-link.dto';
import { MagicLinkAuthGuard } from './passport/magic-link-auth.guard';
import { MagicLinkExceptionFilter } from './magic-link-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private magicLinkStrategy: MagicLinkStrategy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: GuardedRequest) {
    return this.authService.login(req.user);
  }

  @Post('magic-link')
  async sendLoginLink(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) body: MagicLinkDto,
  ) {
    const { destination } = body;
    await this.authService.validateUserWithMagicLink(destination);
    if (destination) {
      return this.magicLinkStrategy.send(req, res);
    }
  }

  @UseGuards(MagicLinkAuthGuard)
  @Get('magic-link/callback')
  @UseFilters(MagicLinkExceptionFilter)
  @Redirect()
  async loginWithMagicLink(@Req() req: GuardedRequest) {
    const { user } = req;
    const token = await this.authService.login(user);
    console.log(token);
    return { url: `${process.env.FRONTEND_URL}?token=${token.access_token}` };
  }

  @Post('register')
  async register(@Req() req: GuardedRequest) {
    return this.authService.register(req.body);
  }
}
