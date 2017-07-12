import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {PermissionService} from "./permission/permissions.service";
import {Constants} from "../../shared/constants";
import {AuthService} from "./auth.service";

@Injectable()
export class LoginRegisterCanActivate implements CanActivate {

  constructor(public router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.getAccessToken()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
