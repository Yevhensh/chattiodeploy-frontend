import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  userLoggedIn(): boolean {
    if(this.authService.getUserRole() != "") {

      this.username = this.authService.getUsername();
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }
}
