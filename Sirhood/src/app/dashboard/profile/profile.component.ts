import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void{
    this.authenticationService.logout();
    this.router.navigate(["/auth"]);
  }

}
