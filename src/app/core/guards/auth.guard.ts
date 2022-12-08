import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { CanActivateChild, CanActivate } from '@angular/router';
import { Router } from '@angular/router';



@Injectable()
export class AuthGuard implements  CanActivate {
  constructor(private srv: UsersService, private router: Router) { }

  // canActivateChild(next: ActivatedRouteSnapshot,state: RouterStateSnapshot)  : Promise<boolean> | boolean {
    //----NO USADO
 /* canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise(resolve =>
      this.srv.isUserLoggedIn()
        .then(status => Boolean => {
          if (status === false) {
            this.router.navigate(["login"]);
          }
          resolve(status);
        })
        .catch(() => {
          this.router.navigate(["login"]);
          resolve(false);
        })
    );   
  }*/
  canActivate(): boolean {
    if (!this.srv.isUserLoggedIn()) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    }
    console.log('estás logueado!!!');
    return true;
  }

  private isPageRefresh(): boolean {
    return (!this.router.navigated);
  }
}
