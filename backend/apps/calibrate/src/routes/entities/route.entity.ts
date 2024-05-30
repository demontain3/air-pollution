import { AbstractEntity } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Position } from '../../positions/entities/position.entity';


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

  @OneToMany(() => Position, position => position.route)
  positions: Position[];


}