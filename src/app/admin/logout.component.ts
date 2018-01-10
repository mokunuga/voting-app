import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-logout',
  template: `
    <p>
      logout works!
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private as: AuthenticationService) { }

  ngOnInit() {
    this.as.logout();
  }

}
