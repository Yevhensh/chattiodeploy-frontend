import {XHRBackend, RequestOptions, Headers} from "@angular/http";
import {AuthHttpInterceptor} from "./auth.interceptor";
import {AuthService} from "../auth.service";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, authService: AuthService) {
  return new AuthHttpInterceptor(xhrBackend, requestOptions, authService);
}
