import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private repo: Repository<Device>,
  ) {}

  add(data: Partial<Device>) {
    const device = this.repo.create(data);
    return this.repo.save(device);
  }

  findByBarcode(barcode: string) {
    return this.repo.findOne({ where: { barcode } });
  }
}
