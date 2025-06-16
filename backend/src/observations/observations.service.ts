import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observation } from './observation.entity';
import { Device } from '../devices/device.entity';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly repo: Repository<Observation>,
  ) {}

  /**
   * Upsert an observation: if one with the same device+timestamp exists,
   * update it; otherwise create a new row.
   */
  async upsert(
    device: Device,
    data: { takenAt: Date; result: string; notes?: string },
  ): Promise<Observation> {
    // Try to find an existing observation for this device at that exact time
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

    // No existing row—create a fresh one
    const obs = this.repo.create({
      device,
      takenAt: data.takenAt,
      result: data.result,
      notes: data.notes ?? null,
    });

    return this.repo.save(obs);
  }
}
