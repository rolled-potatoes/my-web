import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Timestamp } from './Timestamp';
import {ScheduleItemType} from './enum';

@Entity()
export class Todo extends Timestamp{
  @PrimaryGeneratedColumn('increment')
  sequence!: number;

  @Column({
    default : ScheduleItemType.TODO
  })
  type: ScheduleItemType.TODO;

  @Column()
  content !:string;

  @Column({
    default: false,
  })
  isDone !: boolean;

  @Column()
  date !: Date;
}
