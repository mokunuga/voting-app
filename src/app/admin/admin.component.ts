import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {User} from '../user/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private currentUser: User = this.authenticationService.getCurrentUser();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }


}
