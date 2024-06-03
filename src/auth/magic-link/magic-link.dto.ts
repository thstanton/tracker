import { IsEmail } from 'class-validator';

export class MagicLinkDto {
  @IsEmail()
  destination: string;
}
