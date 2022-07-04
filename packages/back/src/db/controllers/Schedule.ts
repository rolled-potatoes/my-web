import { EntityManager } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo } from 'entities/Todo';
import { Schedule } from 'entities/Schedule';
import { ScheduleItemType } from 'entities/enum';

class ScheduleController {
  manager: EntityManager;
  constructor() {
    this.manager = AppDataSource.manager;
  }

  async create({ todo, itemType }: { todo: Todo; itemType: ScheduleItemType }) {
    const newSchedule = new Schedule();
    newSchedule.itemType = itemType;
    newSchedule.item = todo;
    return this.manager.save(newSchedule);
  }
}

export default new ScheduleController();
