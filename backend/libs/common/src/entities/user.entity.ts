import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../database';
import { Role } from './role.entity';
import { Status } from '../enums/status.enum';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string

  @Column({nullable:true})
  profile_picture?: string;

  @Column({ type: 'enum', enum: Status, default: Status.Pending })
  status: Status

  @ManyToMany(() => Role, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  roles?: Role[];
}
