import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  getUserURL: string;
  users: [{first_name:"Paul",last_name:"Adam"}];

  constructor(private http: HttpClient) { 
    this.getUserURL = 'https://api.myjson.com/bins/pkisp'; 
  }

  getData(): any {
    return this.http.get(this.getUserURL);
    // return this.users;
  }
}
