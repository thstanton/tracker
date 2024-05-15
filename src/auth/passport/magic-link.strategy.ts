import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import MagicLoginStrategy from 'passport-magic-login';
import { ResendService } from '../resend/resend.service';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(MagicLoginStrategy) {
  constructor(
    private resend: ResendService,
    private authService: AuthService,
  ) {
    super({
      secret: process.env.MAGIC_LINK_SECRET,
      callbackUrl: process.env.MAGIC_LINK_CALLBACK_URL,
      sendMagicLink: async (destination: string, href: string) => {
        console.log('Sending magic link to: ' + destination);
        await this.resend.emails.send({
          from: 'onboarding@resend.dev',
          to: destination,
          subject: 'Log into Cliki.in',
          html: `<a href="${href}">Click here to login</a>`,
        });
      },
      verify: async (payload: { destination: string }, callback: any) => {
        callback(null, this.validate(payload));
      },
    });
  }

  validate(payload: { destination: string }) {
    const user = this.authService.validateUserByMagicLink(payload.destination);
    return user;
  }
}
