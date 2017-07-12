import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Sample} from "./sample";
import {Constants} from "./constants";

@Injectable()
export class SampleService {

  constructor(private http: Http) {
  }

  someReq(): Observable<Sample[]> {
    return this.http.get(Constants.SERVER_URL + "test")
      .map((response: Response) => <Sample[]> response.json())
  }
}
