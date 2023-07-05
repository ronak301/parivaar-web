import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router,
    public auth: AuthService
  ) { }

  canActivate(): boolean {
    if (this.auth.getUserAuthStateLocalData()) {
      return true
    }
    else {
      this.router.navigateByUrl("/auth")
      return false
    }
  }

}
