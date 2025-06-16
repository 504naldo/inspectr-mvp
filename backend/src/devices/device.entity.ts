import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Observation } from '../observations/observation.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  barcode!: string;

  @Column()
  building!: string;

  @Column()
  type!: string;

  @OneToMany(() => Observation, o => o.device)
  observations!: Observation[];
}
