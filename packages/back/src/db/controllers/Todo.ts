import { EntityManager } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo } from 'entities/Todo';
import { User } from 'entities/User';

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
}

export default new TodoController();
