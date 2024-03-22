import { Controller, Ip, Param, Get, Query, Redirect } from '@nestjs/common';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';

@Controller('link')
export class ApiController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
  ) {}

  // Fetch the destination using the slug parameter, log the click, and redirect to the destination.
  @Get(':slug')
  @Redirect()
  async click(
    @Param('slug') slug: string,
    @Query('identifier') identifier: string,
    @Ip() ipAddress: string,
  ) {
    const destination = await this.destinationsService.findOne({ slug });
    await this.clicksService.create({
      ipAddress,
      destination: destination.slug,
      identifier,
    });
    return { url: destination.url };
  }
}
