import { Injectable } from '@nestjs/common';
import { ResendService } from '../resend/resend.service';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(Strategy) {
  constructor(
    private resend: ResendService,
    private authService: AuthService,
  ) {
    super({
      secret: process.env.MAGIC_LINK_SECRET,
      jwtOptions: {
        expiresIn: '10m',
      },
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
    return this.authService.validateUserWithMagicLink(payload.destination);
  }
}
