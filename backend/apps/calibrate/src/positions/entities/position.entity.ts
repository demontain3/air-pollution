import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Route } from '../../routes/entities/route.entity'; // Assuming you have a Route entity defined

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

  @ManyToOne(() => Route)
  route: Route;
}