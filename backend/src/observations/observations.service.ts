import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observation } from './observation.entity';
import { Device } from '../devices/device.entity';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private repo: Repository<Observation>,
  ) {}

  async upsert(device: Device, data: { takenAt: Date; result: string; notes?: string }) {
    const existing = await this.repo.findOne({
      where: { device: { id: device.id }, takenAt: data.takenAt },
    });
    if (existing) {
  existing.result = data.result;
  if (data.notes !== undefined) {
    existing.notes = data.notes;
  }
  return this.repo.save(existing);
}

    }
    const obs = this.repo.create({ ...data, device });
    return this.repo.save(obs);
  }
}
