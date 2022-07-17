import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Timestamp } from './Timestamp';
import { ScheduleItemType } from './enum';

@Entity()
export class Todo extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  sequence!: number;

  @Column({
    default: ScheduleItemType.TODO,
  })
  type: ScheduleItemType.TODO;

  @Column()
  content!: string;

  @Column({
    default: false,
  })
  isDone!: boolean;

  @Column()
  date!: Date;

  @ManyToOne(() => User, (user) => user.sequence)
  @JoinColumn({ name: 'userSequence' })
  user!: User;
}
