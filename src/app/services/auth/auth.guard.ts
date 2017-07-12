import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {PermissionService} from "./permission/permissions.service";
import {Constants} from "../../shared/constants";

@Injectable()
export class OAuthCanActivate implements CanActivate {

  constructor(public router: Router, private permissions: PermissionService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if(localStorage.getItem(Constants.AUTH_TOKEN)) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
