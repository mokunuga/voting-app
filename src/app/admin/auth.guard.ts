import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private as: AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const expectedRole = route.data.expectedRole;
    this.as.getCurrentUserAPI().subscribe(
      (data: {role}) => {
        if (data.role === null || data.role !== expectedRole) {
          this.router.navigate(['login'], {queryParams: {admin: false}});
          return false;
        }
      }
    );
    return true;
  }



}
