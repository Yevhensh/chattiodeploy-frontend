
import {Injectable, OnInit} from "@angular/core";
import {Permission} from "./permission"

@Injectable()
export class PermissionService implements OnInit {

  private permissions: Permission[];

  constructor() {
  }

  ngOnInit(): void {
    let adminRoutes = ["chat", "profile"];
    this.permissions.push(new Permission("ADMIN", adminRoutes));
    let userRoutes = ["chat", "profile"];
    this.permissions.push(new Permission("USER", userRoutes));
  }

  public getPermissions(): Permission[] {
    return this.permissions;
  }
}
