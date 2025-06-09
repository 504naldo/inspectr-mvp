import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './devices/device.entity';
import { Observation } from './observations/observation.entity';
import { DevicesModule } from './devices/devices.module';
import { ObservationsModule } from './observations/observations.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'inspectr',
      password: 'inspectr',
      database: 'inspectr',
      autoLoadEntities: true,
      synchronize: true, // NOTE: auto-sync OK for dev
    }),
    DevicesModule,
    ObservationsModule,
    SyncModule,
  ],
})
export class AppModule {}
