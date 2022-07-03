import { AppDataSource } from '../data-source';
import { User } from 'entities/User';

class UserController {
  findOneById(id: string) {
    return AppDataSource.manager.findOneBy(User, {
      id,
    });
  }
  findOneBySequence (sequence : number){
    return AppDataSource.manager.findOneBy(User, {
      sequence
    })
  }

  createUser({
    id,
    name,
    profile,
  }: {
    id: string;
    name: string;
    profile?: string;
  }) {
    const newUser = new User();
    newUser.id = id;
    newUser.name = name;
    newUser.profile = profile;
    return AppDataSource.manager.save(newUser);
  }
}

export default new UserController();
