// backend/src/devices/devices.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly repo: Repository<Device>,
  ) {}

  add(data: Partial<Device>): Promise<Device> {
    const device = this.repo.create(data);
    return this.repo.save(device);
  }

  findByBarcode(barcode: string): Promise<Device | null> {
    return this.repo.findOne({ where: { barcode } });
  }
}
