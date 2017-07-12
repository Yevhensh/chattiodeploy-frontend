import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {User} from "../../../shared/user";
import {UserService} from "../../../services/user/user.service";
import {DialogService} from "../../../services/chat-dialog/chat-dialog.service";
import {Message} from "../../../shared/message";
import {AuthService} from "../../../services/auth/auth.service";
import {StompService} from "../../../services/stomp/stomp.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ChatToDialogComponent} from "../chat-to-dialog/chat-to-dialog.component";

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.scss']
})
export class ChatToComponent implements OnInit {

  users: User[];
  messages: Message[];
  dialogRef: MdDialogRef<any>;
  dialogId: number;
  currentUsername: string;
  sendMessage: string;
  @ViewChild('scrollBot') private myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private authService: AuthService,
              private stompService: StompService, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.currentUsername = this.authService.getUsername();
    this.route.params.subscribe(params => {
      this.dialogId = parseInt(params['dialogId']);
      this.fetchDialogUsers();
      this.fetchDialogMessages();
      this.subscribeForMessages();
    });
    setTimeout(() => {
      this.scrollToBottom()
    }, 500);
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  public isMyMessage(message: Message): boolean {
    return message.user.email == this.currentUsername;
  }

  public handleSend() {
    this.stompService.publishMessage(this.sendMessage, this.dialogId);
    this.sendMessage = '';
  }

  private subscribeForMessages() {
    let stompClient = this.stompService.initStompClient();
    stompClient.connect(this.authService.websocketTokenHeader(), (frame) => {
      stompClient.subscribe(`/topic/${this.dialogId}/messages`, (response) => {
        let res = JSON.parse(response.body);
        this.messages.push(res);
        setTimeout(() => {
          this.scrollToBottom()
        }, 700);
      });
    });
  }

  public addUserToDialogModal() {
    this.dialogRef = this.dialog.open(ChatToDialogComponent);
    this.dialogRef.componentInstance.dialogId = this.dialogId;
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchDialogUsers();
    });
  }

  private fetchDialogUsers() {
    this.dialogService.getDialogUsers(this.dialogId)
      .subscribe(res => {
        this.users = res;
      })
  }

  private fetchDialogMessages() {
    this.dialogService.getDialogMessages(this.dialogId)
      .subscribe(res => {
        this.messages = res;
      });
  }
}
