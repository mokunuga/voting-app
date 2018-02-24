import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  private users;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsersAPI().subscribe(
      data => {
        console.log(data);
        this.users = data;
      }
    );
  }

}
