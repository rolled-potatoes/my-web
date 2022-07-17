import { User as EntityUser } from 'entities/User';

declare global {
  namespace Express {
    export interface User extends EntityUser {}
  }
}
