import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/user";
import {DialogService} from "../../../services/chat-dialog/chat-dialog.service";

@Component({
  selector: 'app-chat-list-dialog',
  templateUrl: './chat-list-dialog.component.html',
  styleUrls: ['./chat-list-dialog.component.scss']
})
export class ChatListDialogComponent implements OnInit {

  users: User[];

  constructor(public dialogRef: MdDialogRef<any>, private userService: UserService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  createDialog(userEmail: string): void {
    this.dialogService.createDialogWithUser(userEmail)
      .subscribe(this.closeDialog());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
