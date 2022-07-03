import { EntityManager } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo } from 'entities/Todo';
import {ScheduleItemType} from 'entities/enum'
import SchduleController from './Schedule';

class TodoController {
  manager: EntityManager;

  constructor() {
    this.manager = AppDataSource.manager;
  }

  async create({ content, date }: { content: string; date: Date }) {
    const newTodo = new Todo();
    newTodo.content = content;
    newTodo.date = date;

    const todo = await this.manager.save(newTodo);
    await SchduleController.create({
      todo,
      itemType: ScheduleItemType.TODO,
    });

    return todo; 
  }
}

export default new TodoController();
