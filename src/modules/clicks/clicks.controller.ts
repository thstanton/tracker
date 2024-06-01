import { Controller, Get, Ip, Param, Query, Redirect } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { DestinationsService } from '../destinations/destinations.service';

@Controller()
export class ClicksController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
  ) {}

  @Get(':slug')
  @Redirect()
  async click(
    @Param('slug') slug: string,
    @Ip() ipAddress: string,
    @Query('id') identifier?: string,
  ) {
    const destination = await this.destinationsService.findOne({
      slug,
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
