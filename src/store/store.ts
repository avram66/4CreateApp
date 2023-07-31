
import {User} from "../interfaces/user.model";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";

export interface UserState extends EntityState<User> {}

@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();
  }
  addUsers(users: User[]) {
    this.add(users);
  }
}
