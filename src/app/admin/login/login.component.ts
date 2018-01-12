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
  private redirect = false;
  private queryParam = null;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['id'] || null;
    });
    if (this.queryParam !== null) {
      this.redirect = true;
    }
  }

  login() {
    console.log(this.user);
    if (!this.authenticationService.login(this.user)) {
      this.errorMsg = 'Authentication Failed';
      this.successMsg = '';
    } else {
      this.errorMsg = '';
      this.successMsg = 'Successful!';
    }
    this.redirect = false;
  }

}
