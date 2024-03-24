import { Controller, Ip, Param, Get, Query, Redirect } from '@nestjs/common';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';

@Controller('link')
export class ApiController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
  ) {}

  @Get('clicks')
  async getAllClicks() {
    return this.clicksService.getAll({ userId });
  }

  @Get('destinations')
  async getAllDestinations() {
    return this.destinationsService.getAll({ userId });
  }

  @Get(':slug')
  @Redirect()
  async click(
    @Param('slug') slug: string,
    @Query('identifier') identifier: string,
    @Ip() ipAddress: string,
  ) {
    const destination = await this.destinationsService.findOne({ slug });
    const click = await this.clicksService.create({
      ipAddress,
      destination: destination.slug,
      identifier,
    });
    console.log({ click });
    return { url: destination.url };
  }
}
