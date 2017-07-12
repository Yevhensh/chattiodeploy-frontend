import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/user";
import {DialogService} from "../../../services/chat-dialog/chat-dialog.service";
import {Dialog} from "../../../shared/dialog";
import {MdDialogRef, MdDialog} from "@angular/material";
import {ChatListDialogComponent} from "../chat-list-dialog/chat-list-dialog.component";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  users: User[];
  dialogs: Dialog[];
  currentUsername: string;

  constructor(private dialogService: DialogService, private authService: AuthService, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.currentUsername = this.authService.getUsername();
    this.fetchUserDialogs();
  }

  public openUsersModal() {
    this.dialogRef = this.dialog.open(ChatListDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchUserDialogs();
    });
  }

  private fetchUserDialogs() {
    this.dialogService.getUserDialogs()
      .subscribe(res => {
          this.dialogs = res;
        },
        err => {

        });
  }

  public isMe(user: User): boolean {
    return user.email == this.currentUsername;
  }
}

