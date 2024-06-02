import {
  Controller,
  Param,
  Get,
  Post,
  UseGuards,
  Body,
  ParseIntPipe,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { GuardedRequest } from 'src/auth/passport/local-auth.guard';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';
import { IdentifiersService } from 'src/modules/identifiers/identifiers.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
    private readonly identifiersService: IdentifiersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('destinations')
  async getAllDestinations(@Req() req: GuardedRequest) {
    const { userId } = req.user;
    return this.destinationsService.getAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('destinations/:id')
  async getDestination(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: GuardedRequest,
  ) {
    const { userId } = req.user;
    return this.destinationsService.findOneById({ id, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Post('destinations')
  async createDestination(
    @Req() req: GuardedRequest,
    @Body()
    body: {
      url: string;
      name: string;
    },
  ) {
    const { userId }: { userId: number } = req.user;
    const { url, name } = body;
    return this.destinationsService.create({
      url,
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
  async getClicks(@Req() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.getAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('clicks/chart')
  async getChartData(@Req() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.getChartData({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('clicks/unread')
  async getUnreadCount(@Req() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.getUnreadCount({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Put('clicks/read/true')
  async markAsRead(@Req() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.clicksService.markAsRead({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('identifiers')
  async getIdentifiers(@Req() req: GuardedRequest) {
    const { userId }: { userId: number } = req.user;
    return this.identifiersService.getAll({ userId });
  }
}
