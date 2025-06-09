import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { DevicesService } from '../devices/devices.service';
import { ObservationsService } from '../observations/observations.service';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly devices: DevicesService,
    private readonly observations: ObservationsService,
  ) {}

  @Post()
  async sync(@Body() dto: { barcode: string; ts: number; result: string; notes?: string }) {
    const device =
      (await this.devices.findByBarcode(dto.barcode)) ??
      (await this.devices.add({
        barcode: dto.barcode,
        building: 'UNKNOWN',
        type: 'UNKNOWN',
      }));

    await this.observations.upsert(device, {
      takenAt: new Date(dto.ts),
      result: dto.result,
      notes: dto.notes,
    });

    return { ok: true };
  }
}
