import { EntityManager } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo } from 'entities/Todo';
import { ScheduleItemType } from 'entities/enum';
import SchduleController from './Schedule';

class TodoController {
  manager: EntityManager;
  entity: Todo;

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

  async update({
    sequence,
    content,
    isDone,
    date,
  }: {
    sequence: number;
    content?: string;
    isDone?: boolean;
    date?: Date;
  }) {
    const updateItem = {
      ...{ content },
      ...{ isDone },
      ...{ date },
    };

    return this.manager.update(Todo, { sequence }, updateItem);
  }
}

export default new TodoController();
