
import {Injectable} from "@angular/core";
import {AuthHttpInterceptor} from "../auth/intercept/auth.interceptor";
import {Response} from "@angular/http";
import {Dialog} from "../../shared/dialog";
import {Observable} from "rxjs";
import {Message} from "../../shared/message";
import {User} from "../../shared/user";

@Injectable()
export class DialogService {

  constructor(private http: AuthHttpInterceptor) {
  }

  public getUserDialogs(): Observable<Dialog[]> {
    return this.http.get("dialogs")
      .map((response: Response) => {
        return <Dialog[]> response.json();
      })
  }

  public getDialogUsers(dialogId: number): Observable<User[]> {
    return this.http.get(`dialog/${dialogId}/users`)
      .map((response: Response) => <User[]> response.json());
  }

  public getDialogMessages(dialogId: number): Observable<Message[]> {
    return this.http.get(`dialog/${dialogId}`)
      .map((response: Response) => <Message[]> response.json());
  }

  public createDialogWithUser(userEmail: string): any {
    return this.http.post("dialogs", userEmail);
  }

  public addUserToDialog(dialogId: number, userEmail: string): any {
    return this.http.put(`dialogs/${dialogId}/users`, userEmail);
  }

  public getUnassociatedDialogUsers(dialogId: number): Observable<User []> {
    return this.http.get(`users/dialogs/${dialogId}`)
      .map((response: Response) => <User[]> response.json());
  }
}
