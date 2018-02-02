import {Component, Input, OnInit} from '@angular/core';
import {User} from './user';
import {NgForm} from '@angular/forms';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() private user: User = {firstName: null, lastName: null, identificationNo: null, username: null, password: null, role: null};
  private roles = ['user'];
  private users: User[] = this.userService.getUsers();
  private userIdUnique = true;
  private usernameUnique = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.userIdUnique = this.isUserIdUnique();
    this.usernameUnique = this.isUsernameUnique();
    if (this.isUserIdUnique() && this.isUsernameUnique()) {
      this.userService.addUser(this.user);
      this.userIdUnique = true;
      this.userIdUnique = true;
    }

  }

  isUserIdUnique() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].identificationNo === this.user.identificationNo) {
        return false;
      }
    }
    return true;
  }

  isUsernameUnique() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.user.username) {
        return false;
      }
    }
    return true;
  }

}
