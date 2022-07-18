import {
  EntityManager,
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo } from 'entities/Todo';
import { User } from 'entities/User';

interface I_FindAllOptions {
  isDone?: boolean;
  start?: Date;
  end?: Date;
}

class TodoController {
  manager: EntityManager;
  entity: Todo;

  constructor() {
    this.manager = AppDataSource.manager;
  }

  async create({
    content,
    date,
    user,
  }: {
    content: string;
    date: Date;
    user: User;
  }) {
    const newTodo = new Todo();
    newTodo.user = user;
    newTodo.content = content;
    newTodo.date = date;

    const todo = await this.manager.save(newTodo);

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

  async find({ options }: { options?: I_FindAllOptions }) {
    const where: { isDone?: boolean; date?: any } = {};

    if (options.isDone !== null && options.isDone !== undefined) {
      where.isDone = options.isDone;
    }
    if (options.start && options.end) {
      where.date = Between(options.start, options.end);
    } else if (options.start) {
      where.date = MoreThanOrEqual(options.start);
    } else if (options.end) {
      where.date = LessThanOrEqual(options.end);
    }

    return this.manager.find(Todo, {
      where,
    });
  }

  async findOne(sequence: number) {
    return this.manager.findOneBy(Todo, { sequence });
  }
}

export default new TodoController();
