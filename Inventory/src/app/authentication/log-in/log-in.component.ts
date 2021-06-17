import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit(): void {
    this.authenticationService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
