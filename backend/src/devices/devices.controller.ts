import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly service: DevicesService) {}

  @Post()
  add(@Body() dto: { barcode: string; building: string; type: string }) {
    return this.service.add(dto);
  }

  @Get(':barcode')
  find(@Param('barcode') barcode: string) {
    return this.service.findByBarcode(barcode);
  }
}
