import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../shared/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  fullName: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(event) {
    event.preventDefault();
    if(this.password !== this.passwordConfirmation) {
      this.errorMessage = "Passwords aren't equal"
    }
    this.authService.register(this.email, this.fullName, this.password)
      .subscribe(
        (res) => {
          this.router.navigateByUrl('/login');
          this.fullName = '';
          this.password = '';
          this.passwordConfirmation = '';
          this.email = '';
        },
        (err) => {
          this.errorMessage = "invalid input data";
        }
      );
  }
}
