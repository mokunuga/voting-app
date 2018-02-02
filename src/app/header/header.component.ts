import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../admin/authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userLoggedIn;
  private adminLoggedIn;
  private subscription: Subscription;
  private subscription1: Subscription;
  constructor(private as: AuthenticationService) {
    this.subscription = this.as.userLoggedIn.subscribe(
    (loggedIn) => {
      this.userLoggedIn = loggedIn;
      }
    );
    this.subscription1 = this.as.adminLoggedIn.subscribe(
      (loggedIn) => {
        this.adminLoggedIn = loggedIn;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
