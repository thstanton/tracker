import {
  Controller,
  Ip,
  Param,
  Get,
  Query,
  Redirect,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest, LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: GuardedRequest) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Request() req: GuardedRequest) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('destinations')
  async getAllDestinations(@Request() req: GuardedRequest) {
    const { userId } = req.user;
    return this.destinationsService.getAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Post('destinations')
  async createDestination(
    @Request() req: GuardedRequest,
    @Body()
    body: {
      url: string;
      name: string;
      slug: string;
    },
  ) {
    const { userId }: { userId: number } = req.user;
    const { url, name, slug } = body;
    return this.destinationsService.create({
      url,
      slug,
      name,
      userId,
    });
  }

  @Get('link/:userId/:slug')
  @Redirect()
  async click(
    @Param('slug') slug: string,
    @Param('userId') userId: number,
    @Query('identifier') identifier: string,
    @Ip() ipAddress: string,
  ) {
    const destination = await this.destinationsService.findOne({
      slug,
      userId,
    });
    if (!destination) {
      throw new Error('404: Destination not found');
    }
    const click = await this.clicksService.create({
      ipAddress,
      destination: destination.slug,
      identifier,
    });
    console.log({ click });
    return { url: destination.url };
  }
}
