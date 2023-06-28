import { Module } from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { GroupeController } from './groupe.controller';

@Module({
  controllers: [GroupeController],
  providers: [GroupeService]
})
export class GroupeModule {}
