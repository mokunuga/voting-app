import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../user/user';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from '../user/user.service';



@Injectable()
export class AuthenticationService {

  private users: User[] = this.userService.getUsers();
  private currentUser: User;
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  adminLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private userService: UserService) {

    if (localStorage.getItem('currentUser') !== null) {
      if (this.isAdmin()) {
        this.adminLoggedIn.next(true);
      } else {
        this.userLoggedIn.next(true);
      }
    }

    this.userService.usersUpdated.subscribe(
      (users) => {
        if (users === true) {
          this.users = this.userService.getUsers();
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userLoggedIn.next(false);
    this.adminLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  login(user) {
    this.currentUser = this.users.find(u => u.username === user.username);
    if (this.currentUser && this.currentUser.password === user.password) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      if (this.isAdmin()) {
        this.userLoggedIn.next(false);
        this.adminLoggedIn.next(true);
        this.router.navigate(['admin']);
      } else {
        this.userLoggedIn.next(true);
        this.adminLoggedIn.next(false);
        this.router.navigate(['candidates']);
      }

      return true;
    }
    return false;
  }

  isAdmin() {
    if (this.getCurrentUser()) {
      return this.getCurrentUser().role === 'admin';
    }
    return false;
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
