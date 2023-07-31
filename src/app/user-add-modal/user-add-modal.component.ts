import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {User} from "../../interfaces/user.model";

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss']
})
export class UserAddModalComponent {
  newUser: User = {id: '', name: '', active: false};

  constructor(public dialogRef: MatDialogRef<UserAddModalComponent>) {
  }

  onAddUser(): void {
    this.dialogRef.close(this.newUser);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
