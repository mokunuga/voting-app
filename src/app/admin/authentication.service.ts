import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';
import {Router} from '@angular/router';
import {isBoolean} from 'util';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';



@Injectable()
export class AuthenticationService {

  private users: User[] = [
    new User('mokunuga', 'test'),
    new User('funmi', 'test')
  ];
  private currentUser: User;
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    if (localStorage.getItem('currentUser') !== null) {
      this.userLoggedIn.next(true);
    }

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
    this.userLoggedIn.next(false);
  }

  login(user) {
    this.currentUser = this.users.find(u => u.username === user.username);
    if (this.currentUser && this.currentUser.password === user.password) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.userLoggedIn.next(true);
      this.router.navigate(['admin']);
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
