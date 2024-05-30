import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Position } from '../../positions/entities/position.entity';


@Entity('sensordata')
export class SensorData extends AbstractEntity<SensorData> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'float'})
  pm: number;

  @Column({type: 'float'})
  humidity: number;

  @Column({type: 'float'})
  temperature: number;

  @Column()
  kei: string;

  @Column()
  timestamp: string;

  @Column()
  device_owner: number; //this is user id

  @OneToOne(() => Position, position => position.sensorData)
  position: Position;
}