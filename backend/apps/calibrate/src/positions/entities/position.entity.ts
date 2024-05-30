import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Route } from '../../routes/entities/route.entity'; // Assuming you have a Route entity defined
import { SensorData } from '../../sensor_datas/entities/sensor_data.entity';

@Entity('position')
export class Position extends AbstractEntity<Position> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  lati: number;

  @Column('float')
  lngi: number;

  @Column('float')
  alti: number;

  @Column()
  timestamp: string;

  @ManyToOne(() => Route, route => route.positions)
  @JoinColumn({name: 'route_id'}) // This is the new line
  route: Route;

  @OneToOne(() => SensorData, sensorData => sensorData.position)
  @JoinColumn()
  sensorData: SensorData;
}