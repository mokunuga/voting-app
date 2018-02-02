import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {User} from '../../user/user';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  `]
})
export class LoginComponent implements OnInit {
  @Input() user  = {username: null, password: null};

  private errorMsg = '';
  private successMsg = '';
  private redirectFromRegistration = false;
  private newUserQueryParam = null;
  private notAdminQueryParam = null;
  private redirectForNotAdmin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.route.queryParams.subscribe(params => {
      this.newUserQueryParam = params['newUser'] || null;
      this.notAdminQueryParam = params['admin'] || null;
    });
    if (this.newUserQueryParam !== null) {
      this.redirectFromRegistration = true;
    }
    if (this.notAdminQueryParam !== null) {
      this.redirectForNotAdmin = true;
    }
  }

  login() {
    if (!this.authenticationService.login(this.user)) {
      this.errorMsg = 'Authentication Failed';
      this.successMsg = '';
    } else {
      this.errorMsg = '';
      this.successMsg = 'Successful!';
    }
    this.redirectFromRegistration = false;
    this.redirectForNotAdmin = false;
  }

}
