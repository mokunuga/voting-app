import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class AuthenticationService {
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  adminLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private http: HttpClient) {
    this.getCurrentUserAPI().subscribe(
      (data: { role }) => {
        if (data.role === 'admin') {
          this.adminLoggedIn.next(true);
        } else {
          this.userLoggedIn.next(true);
        }
      }
    );
  }

  loginAPI(user) {
    return this.http.post('http://secure-ballot-api.herokuapp.com/api/login', user);
  }

  getCurrentUserAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/current-user', {headers: {'Authorization': 'Bearer ' + this.getToken()}});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutAPI() {
    return this.http.get('http://secure-ballot-api.herokuapp.com/api/current-user', {headers: {'Authorization': 'Bearer ' + this.getToken()}});
  }

  logout() {
    this.logoutAPI().subscribe(
      data => localStorage.removeItem('token')
    );
    this.userLoggedIn.next(false);
    this.adminLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  AdminUserRoute() {
    this.getCurrentUserAPI().subscribe(
      (data: { role }) => {
        if (data.role === 'admin') {
          this.userLoggedIn.next(false);
          this.adminLoggedIn.next(true);
          this.router.navigate(['admin']);
        } else {
          this.userLoggedIn.next(true);
          this.adminLoggedIn.next(false);
          this.router.navigate(['candidates']);
        }
      }
    );
  }
}
