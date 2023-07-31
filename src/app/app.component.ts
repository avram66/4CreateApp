import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user.model";

@Component({
  selector: 'app-root',
  template: '<app-user></app-user>',
})
export class AppComponent {
  constructor(private userService: UserService) {
    const initialUsers: User[] = [
      {id: "1", name: 'John Doe', active: true},
      {id: "2", name: 'Jane Smith', active: true},
    ];
    initialUsers.forEach(user => this.userService.add(user));
  }
}
