import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, Router } from "@angular/router";
import { slider} from "../router-animation";
import {LoggedInService} from "../app-logic/logged-in-service.service";



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [     
     slider  
  ]
})

export class NavComponent {
  
  isLoggedIn$ = new BehaviorSubject(false);
   isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );   
   
  constructor(private breakpointObserver: BreakpointObserver,   
    private loggedInService: LoggedInService ,
    private router: Router) {
       
    }

    get isLoggedIn(): boolean {
      return this.isLoggedIn$.value;
    }
    set isLoggedIn(v: boolean) {
      this.isLoggedIn$.next(v);
    }

    ngOnInit():void{
      if(document.cookie.length >20){
        this.isLoggedIn=true;
      }
    }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout(){    
    document.cookie=null;
    this.isLoggedIn=false;
    this.loggedInService.changeLoggedIn(false);
    this.router.navigate(["/"]);
    
    
  }
}
