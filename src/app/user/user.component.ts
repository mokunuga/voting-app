import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() public user = {name: null, email: null, nin: null, password: null, passwordConfirm: null};
  public error;
  public keys;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    const user = {name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.passwordConfirm,
      NIN: form.value.nin};
    this.userService.addUserAPI(user).subscribe(
      (data: {success, error, data}) => {
        if (data.success) {
          this.userService.usersUpdated.next(true);
          this.router.navigate(['/login'], {queryParams: {newUser: data.data.name}});
        } else {
          this.error = data.error;
          this.keys = Object.keys(data.error);
        }
      }
    );
  }

}
