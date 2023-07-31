import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {defaultIfEmpty, map, Observable, of} from 'rxjs';
import {User} from "../../interfaces/user.model";
import {UserStore} from "../../store/store";
import {UserQuery} from "../../store/user.query";
import {v4 as uuidv4} from 'uuid';
import {UserAddModalComponent} from "../user-add-modal/user-add-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users$: Observable<User[]> = this.userQuery.selectAll()
  isAddUserButtonEnabled$: Observable<boolean> = of(false);
  private isDialogOpen = false;


  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(public userStore: UserStore, private userQuery: UserQuery, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.users$ = this.userQuery.selectAll();

    this.isAddUserButtonEnabled$ = this.users$.pipe(
      map(users => {
        const allUsersActive = users.every(user => user.active);
        const usersCount = users.length;
        return allUsersActive && usersCount < 5;
      })
    );


  }


  toggleActive(user: User) {
    this.userStore.update(user.id, {active: !user.active});
  }


  openAddUserModal(): void {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true
      const dialogRef = this.dialog.open(UserAddModalComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe((result: User) => {
        this.isDialogOpen = false
        if (result) {
          this.onAddUser(result);

        }
      });
    }
  }

  onAddUser(newUser: User) {
    newUser.id = uuidv4()
    this.userStore.add(newUser);
    this.table.renderRows();


  }
  onDeleteUser(user: User) {
    const confirmDelete = confirm(`Are you sure you want to delete user with ID: ${user.id}?`);
    if (confirmDelete) {
      this.userStore.remove(user.id);
    }
  }

}
