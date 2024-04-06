import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity('sensordata')
export class SensorData extends AbstractEntity<SensorData> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kei: string;

  @Column('float')
  value: number;

  @Column()
  timestamp: string;

  @Column()
  device_owner: number; //this is user id
}