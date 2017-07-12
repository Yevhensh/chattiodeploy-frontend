
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthHttpInterceptor} from "../auth/intercept/auth.interceptor";
import {User} from "../../shared/user";
import {Response} from "@angular/http";


@Injectable()
export class UserService {

  constructor(private http: AuthHttpInterceptor) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get("users")
      .map((response: Response) => <User[]> response.json())
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get(`users/${userId}`)
      .map((response: Response) => <User> response.json());
  }
}
