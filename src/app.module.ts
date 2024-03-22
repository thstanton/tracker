import { Module } from '@nestjs/common';
import { ClicksModule } from './modules/clicks/clicks.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ClicksModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
