import { Injectable } from '@angular/core';
import {UserStore} from "../store/store";
import {User} from "../interfaces/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore) {}

  add(user: User) {
    this.userStore.add(user);
  }

}
