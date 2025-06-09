import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Device } from '../devices/device.entity';

@Entity()
export class Observation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, d => d.observations, { eager: true })
  device: Device;

  @Column()
  takenAt: Date;

  @Column()
  result: string;

  @Column({ nullable: true })
  notes?: string;
}
