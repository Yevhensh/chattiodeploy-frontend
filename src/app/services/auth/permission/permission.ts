
export class Permission {
  private role: string;
  private acceptedRoutes: string[];

  constructor(role: string, acceptedRoutes: string[]) {
    this.role = role;
    this.acceptedRoutes = acceptedRoutes;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(value: string) {
    this.role = value;
  }

  public getAcceptedRoutes(): string[] {
    return this.acceptedRoutes;
  }

  public setAcceptedRoutes(value: string[]) {
    this.acceptedRoutes = value;
  }
}
