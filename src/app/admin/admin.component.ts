import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public currentUser;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getCurrentUserAPI().subscribe(
      (data) => {
        this.currentUser = data;
      }
    );
  }


}
