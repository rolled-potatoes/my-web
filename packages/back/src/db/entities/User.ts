import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Timestamp } from './Timestamp';
import { UserRole } from './enum';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  sequence!: number;

  @Column()
  id!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  level!: UserRole;

  @Column()
  profile?: string;
}
