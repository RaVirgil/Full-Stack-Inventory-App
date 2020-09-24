import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../app-logic/user';
import { Router } from '@angular/router';
import { UserService } from '../app-logic/user-service.service';
import { LoggedInService } from '../app-logic/logged-in-service.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  isLoggedIn: boolean;
  user: User;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loggedInService: LoggedInService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loggedInService.sharedLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  get User() {
    return this.user;
  }
  onSubmit() {
    this.user = new User(this.logInForm.value);
    this.userService.loginUser(this.user).subscribe((data) => {
      if (data == 'incorrect password') {
        alert('incorrect password');
        return;
      }
      if (data == 'user non-existent') {
        alert('user could not be found');
        return;
      }
      this.loggedInService.changeLoggedIn(true);
      document.cookie = data;
      this.router.navigate(['/inventory']);
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.logInForm.controls[controlName].hasError(errorName);
  }
}
