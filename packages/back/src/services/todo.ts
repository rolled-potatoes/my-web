import TodoController from 'controllers/Todo';
import { UpdateResult } from 'typeorm';

async function patchOne({
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
  let res: UpdateResult;
  try {
    res = await TodoController.update({
      sequence,
      content,
      isDone,
      date,
    });
  } catch (e) {
    console.error(`error(todo update)\n${e}`);
    throw e;
  }

  return res;
}

export default {
  patchOne,
};
