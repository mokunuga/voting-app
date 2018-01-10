import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {User} from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  `]
})
export class LoginComponent implements OnInit {
  @Input() user: User = {username: null, password: null};

  private errorMsg = '';
  private successMsg = '';

  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    if (!this.authenticationService.login(this.user)) {
      this.errorMsg = 'Authentication Failed';
      this.successMsg = '';
    } else {
      this.errorMsg = '';
      this.successMsg = 'Successful!';
    }
  }

}
