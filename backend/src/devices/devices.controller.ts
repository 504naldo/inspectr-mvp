import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';

@Controller('devices')
export class DevicesController {
  constructor(private readonly service: DevicesService) {}

  // Existing POST /devices to create a new device
  @Post()
  add(@Body() dto: { barcode: string; building: string; type: string }): Promise<Device> {
    return this.service.add(dto);
  }

  // NEW: GET /devices/:barcode → fetch a device by its barcode
  @Get(':barcode')
  async findOne(@Param('barcode') barcode: string): Promise<Device> {
    const device = await this.service.findByBarcode(barcode);
    if (!device) {
      // Return 404 if not found
      throw new NotFoundException(`Device with barcode "${barcode}" not found`);
    }
    return device;
  }
}
