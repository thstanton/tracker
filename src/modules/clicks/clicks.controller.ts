import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { DestinationsService } from '../destinations/destinations.service';
import { RealIP } from 'nestjs-real-ip';

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
    @RealIP() ipAddress: string,
    @Query('id') identifier?: string,
  ) {
    const destination = await this.destinationsService.findOne({
      slug,
    });
    console.log(ipAddress);
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
