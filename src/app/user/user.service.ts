import { Injectable } from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private users: User[] = [
    new User('Melody', 'Okunuga', 123, 'mokunuga', 'test', 'admin'),
  ];
  usersUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private localUsers;
  constructor(private router: Router) { }

  getUsers() {
    if (localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    this.localUsers = JSON.parse(localStorage.getItem('users'));
    return this.localUsers;
  }

  addUser(user: User) {
    this.users = this.getUsers();
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.usersUpdated.next(true);
    this.router.navigate(['/login'], {queryParams: {newUser: user.username}});
  }

}
