import {Injectable, OnInit} from "@angular/core";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Constants} from "../../shared/constants";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class StompService {

  stompClient: any;

  constructor(private authService: AuthService) {
  }

  public initStompClient(): any {
    let socket = new SockJS(Constants.SERVER_URL + "chat");
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }

  public publishMessage(message: string, dialogId: number): void {
    let sendObject = {
      message: message,
      username: this.authService.getUsername()
    };
    this.stompClient.send((`/app/chat/${dialogId}`), {}, JSON.stringify(sendObject));
  }

}
