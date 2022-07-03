import {
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Todo } from './Todo';
import { Timestamp } from './Timestamp';
import { ScheduleItemType } from './enum';

@Entity()
export class Schedule extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  sequence!: number;

  @Column({
    type: 'enum',
    enum: ScheduleItemType,
    default: ScheduleItemType.TODO,
  })
  itemType!: ScheduleItemType;

  @OneToOne(() => Todo, (todo) => todo.sequence)
  @JoinColumn({ name: 'itemSeqence' })
  item: Todo;
}
