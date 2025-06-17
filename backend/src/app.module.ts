import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from './devices/devices.module';
import { ObservationsModule } from './observations/observations.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    // Load .env locally and Render’s env-vars into process.env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Use a single DATABASE_URL rather than individual host/user/pass vars
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // turn off in production
    }),

    DevicesModule,
    ObservationsModule,
    SyncModule,
  ],
})
export class AppModule {}
