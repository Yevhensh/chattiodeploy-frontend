import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();
    this.authService.login(this.username, this.password)
      .subscribe(
        (res) => {
          this.username = '';
          this.password = '';
          this.errorMessage = '';
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.errorMessage = "username or password aren't valid";
        }
      );
  }
}
