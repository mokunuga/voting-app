import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../admin/authentication.service';

@Injectable()
export class UserService {

  usersUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private http: HttpClient, private as: AuthenticationService) { }

  getUsersAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/users', {headers: {'Authorization': 'Bearer ' + this.as.getToken()}});
  }

  addUserAPI(user) {
    return this.http.post('http://secure-ballot-api.herokuapp.com/api/register', user);
  }

}
