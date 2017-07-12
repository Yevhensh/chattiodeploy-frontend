import {Injectable, Injector} from "@angular/core";
import {ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../auth.service";
import {Constants} from "../../../shared/constants";

@Injectable()
export class AuthHttpInterceptor extends Http {
  customOptions: RequestOptionsArgs;
  customMethodName: string;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authService: AuthService) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.customMethodName = "GET";
    return this.validateAuthorization(url, "", options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.customMethodName = "POST";
    return this.validateAuthorization(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.customMethodName = "PUT";
    return this.validateAuthorization(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.customMethodName = "DELETE";
    return this.validateAuthorization(url, "", options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.customMethodName = "PATCH";
    return this.validateAuthorization(url, body, options);
  }

  private validateAuthorization(url: string, body: any, options?: RequestOptionsArgs) {
    url = this.interceptUrlWithServerPath(url);
    return this.authService.approveTokenExpiration()
      .map(res => {
        return res;
      })
      .catch(err => {
        return this.authService.refreshToken();
      })
      .flatMap(res => {
        this.customOptions = this.getRequestOptionArgs(options);
        switch (this.customMethodName) {
          case 'GET':
            return super.get(url, this.customOptions);
          case 'POST':
            return super.post(url, body, this.customOptions);
          case 'PUT':
            return super.put(url, body, this.customOptions);
          case 'DELETE':
            return super.delete(url, this.customOptions);
          case 'PATCH':
            return super.patch(url, body, this.customOptions);
          default:
            console.log("default");
        }
      });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append(Constants.AUTHORIZATION, this.authService.formTokenHeaderValue());
    return options;
  }

  private interceptUrlWithServerPath(resource: string): string {
    return Constants.SERVER_URL + resource;
  }
}
