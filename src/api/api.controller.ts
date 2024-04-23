import {
  Controller,
  Param,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest, LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';
import { IdentifiersService } from 'src/modules/identifiers/identifiers.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
    private readonly authService: AuthService,
    private readonly identifiersService: IdentifiersService,
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
  @Get('destinations/:id')
  async getDestination(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: GuardedRequest,
  ) {
    const { userId } = req.user;
    return this.destinationsService.findOneById({ id, userId });
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

  @UseGuards(JwtAuthGuard)
  @Delete('destinations/:id')
  async deleteDestination(@Param('id', ParseIntPipe) id: number) {
    return this.destinationsService.delete({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Put('destinations/:id')
  async updateDestination(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      url: string;
      name: string;
      slug: string;
    },
  ) {
    const { url, name, slug } = body;
    return this.destinationsService.update({ id, url, name, slug });
  }

  @UseGuards(JwtAuthGuard)
  @Get('clicks')
  async getClicks(@Request() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.getAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('clicks/chart')
  async getChartData(@Request() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.getChartData({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('identifiers')
  async getIdentifiers(@Request() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.identifiersService.getAll({ userId });
  }
}
