import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Module({
  controllers: [],
  providers: [ApplicationService],
})
export class ApplicationModule {}
