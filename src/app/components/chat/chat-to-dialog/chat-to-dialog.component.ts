import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/user";
import {DialogService} from "../../../services/chat-dialog/chat-dialog.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-chat-to-dialog',
  templateUrl: './chat-to-dialog.component.html',
  styleUrls: ['../chat-list-dialog/chat-list-dialog.component.scss']
})
export class ChatToDialogComponent implements OnInit {

  users: User[];
  dialogId: number;

  constructor(public dialogRef: MdDialogRef<any>, private dialogService: DialogService) { }

  ngOnInit() {
    this.dialogService.getUnassociatedDialogUsers(this.dialogId)
      .subscribe(res => {
        this.users = res;
      })
  }

  createDialog(userEmail: string): void {
    this.dialogService.addUserToDialog(this.dialogId, userEmail)
      .subscribe(this.closeDialog());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
