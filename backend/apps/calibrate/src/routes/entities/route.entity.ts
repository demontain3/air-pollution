import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity('route')
export class Route extends AbstractEntity<Route> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: string;

  @Column()
  finish: string;

  @Column({ default: false })
  complete: boolean;

  @Column()
  owner: number; // this is user ID
}