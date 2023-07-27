import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityPendingStateGuardService implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // You can access the data property and the arguments passed to the route here
    const customData = next.data;
    console.log('Custom Data:', next);

    // Your authentication logic here...
    // Return true if the user is authenticated and allowed to access the route,
    // or false if the user is not authenticated and should be redirected.

    return true; // Replace this with your actual authentication logic
  }

}
