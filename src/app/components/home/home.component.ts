import {Component, OnInit} from '@angular/core';
import {Constants} from "../../shared/constants";
import {AuthHttpInterceptor} from "../../services/auth/intercept/auth.interceptor";
import {Observable} from "rxjs";
import {RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public http: AuthHttpInterceptor) {
  }

  ngOnInit() {
  }

  getSmth(event) {
    this.http.get("test")
      .subscribe(res => {
          console.log(res);
        }
      );
  }
}
