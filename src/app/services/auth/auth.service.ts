import {Injectable} from "@angular/core";
import {Constants} from '../../shared/constants'
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {JwtHelper} from "angular2-jwt";
import {User} from "../../shared/user";

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelper;

  constructor(public http: Http) {
    this.jwtHelper = new JwtHelper();
  }

  public login(username, password): Observable<any> {
    let encodedPassword = btoa(password);
    let authHeader = 'Basic ' + btoa(Constants.clientId + ":" + Constants.clientSecret);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', authHeader);
    let options = new RequestOptions({headers: headers});
    let body = "grant_type=" + encodeURIComponent("password") +
      "&username=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(encodedPassword);

    return this.http
      .post(Constants.oauthLoginEndPointUrl, body, options)
      .map(res => {
        this.setAuthLocalStorageItems(res);
        return res;
      })
      .catch(error => {
        const body = JSON.parse(error.body);
        let errMsg: string = body.error;
        return Observable.throw(errMsg);
      });
  }

  public register(email: string, fullName: string, password: string): Observable<any> {
    let encodedPassword = btoa(password);
    let user: User = new User();
    user.email = email;
    user.active = true;
    user.fullName = fullName;
    user.password = encodedPassword;
    return this.http.post(Constants.SERVER_URL + "users", user)
      .map(res => res)
      .catch(err => err);
  }

  private setAuthLocalStorageItems(res: any) {
    let data = res.json();
    localStorage.setItem(Constants.AUTH_TOKEN, data.access_token);
    localStorage.setItem(Constants.REFRESH_TOKEN, data.refresh_token);
  }

  private removeAuthLocalStorageItems() {
    localStorage.removeItem(Constants.AUTH_TOKEN);
    localStorage.removeItem(Constants.REFRESH_TOKEN);
  }

  public refreshToken(): Observable<any> {
    let refreshToken = localStorage.getItem(Constants.REFRESH_TOKEN);
    let refreshEndPointUrl = Constants.oauthLoginEndPointUrl + "?grant_type=refresh_token&client_id=" +
      Constants.clientId + "&client_secret=" + Constants.clientSecret + "&refresh_token=" + refreshToken;
    return this.http
      .post(refreshEndPointUrl, {})
      .map(res => {
        this.setAuthLocalStorageItems(res);
        this.removeAuthLocalStorageItems();
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  public websocketTokenHeader(): any {
    return {
      "Authorization": this.formTokenHeaderValue()
    }
  }

  public formTokenHeaderValue(): string {
    let authToken = localStorage.getItem(Constants.AUTH_TOKEN);
    return authToken ? "Bearer " + authToken : "";
  }

  /*
   * Making simple request to determine
   * if token has exprired
   * */
  public approveTokenExpiration(): Observable<any> {
    let header = new Headers();
    header.append('Authorization', this.formTokenHeaderValue());
    let options = new RequestOptions({headers: header});
    return this.http.get(Constants.SERVER_URL, options);
  }

  public logout() {
    localStorage.removeItem(Constants.AUTH_TOKEN);
  }

  public getUserRole(): string {
    let token = localStorage.getItem(Constants.AUTH_TOKEN);
    if (!token) {
      return "";
    }
    let role = this.jwtHelper.decodeToken(token).authorities[0];
    let formattedRole = role.slice(5);
    return formattedRole;
  }

  public getAccessToken(): string {
    return localStorage.getItem(Constants.AUTH_TOKEN);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(Constants.REFRESH_TOKEN);
  }

  public getUsername(): string {
    let authToken = localStorage.getItem(Constants.AUTH_TOKEN);
    let decoded = this.jwtHelper.decodeToken(authToken);
    return decoded.user_name;
  }
}
