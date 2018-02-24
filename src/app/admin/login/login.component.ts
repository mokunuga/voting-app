import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  `]
})
export class LoginComponent implements OnInit {
  @Input() user  = {email: null, password: null};

  private errorMsg;
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
    this.authenticationService.loginAPI(this.user).subscribe(
      (data: {access_token}) => {
        localStorage.setItem('token', data.access_token);
        this.authenticationService.AdminUserRoute();
      },
      (error: {success, error}) => {
        this.errorMsg = error.error.error;
      }
    );
    this.redirectFromRegistration = false;
    this.redirectForNotAdmin = false;
  }

}
