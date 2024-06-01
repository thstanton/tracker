import { Injectable, Req, Res } from '@nestjs/common';
import { MagicLinkStrategy } from './magic-link.strategy';
import { Request, Response } from 'express';

@Injectable()
export class MagicLinkService {
  constructor(private magicLinkStrategy: MagicLinkStrategy) {}

  async send(@Req() req: Request, @Res() res: Response) {
    return this.magicLinkStrategy.send(req, res);
  }

  //   async verify(@Req() req: Request) {
  //     return this.magicLinkStrategy.validate()
  //   }
}
