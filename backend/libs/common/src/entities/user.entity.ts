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
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'enum', enum: Status, default: Status.Pending })
  status: Status;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToMany(() => Role, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinTable()
  roles?: Role[];
}
