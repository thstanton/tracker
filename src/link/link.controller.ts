import {
  Controller,
  Get,
  Ip,
  Param,
  ParseIntPipe,
  Query,
  Redirect,
} from '@nestjs/common';
import { ClicksService } from 'src/modules/clicks/clicks.service';
import { DestinationsService } from 'src/modules/destinations/destinations.service';

@Controller('link')
export class LinkController {
  constructor(
    private readonly clicksService: ClicksService,
    private readonly destinationsService: DestinationsService,
  ) {}

  @Get(':userId/:slug')
  @Redirect()
  async click(
    @Param('slug') slug: string,
    @Param('userId', ParseIntPipe) userId: number,
    @Ip() ipAddress: string,
    @Query('id') identifier?: string,
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
