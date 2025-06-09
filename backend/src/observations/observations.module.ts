import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './observation.entity';
import { ObservationsService } from './observations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Observation])],
  providers: [ObservationsService],
  exports: [ObservationsService],
})
export class ObservationsModule {}
