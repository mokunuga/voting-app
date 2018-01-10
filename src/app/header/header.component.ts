import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../admin/authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private loggedIn;
  private subscription: Subscription;
  constructor(private as: AuthenticationService) {
    this.subscription = this.as.userLoggedIn.subscribe(
    (loggedIn) => {
      this.loggedIn = loggedIn;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
