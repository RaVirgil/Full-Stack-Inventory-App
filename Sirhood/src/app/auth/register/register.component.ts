import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/@core/entities/user.entity';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  public register(): void {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;    
    const email = this.registerForm.value.email;
    const active = true;
    const user = new User(username, password, active);
    this.authenticationService.register(user);
    this.authenticationService.login(user.username, user.password);
    this.router.navigate(['']);
  }
}
