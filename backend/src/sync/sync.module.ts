import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { DevicesModule } from '../devices/devices.module';
import { ObservationsModule } from '../observations/observations.module';

@Module({
  imports: [DevicesModule, ObservationsModule],
  controllers: [SyncController],
})
export class SyncModule {}
