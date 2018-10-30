import { Router } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('authGuard', this.user.isAuthenticated);
    if (!this.user.isAuthenticated) {
      this.route.navigate(['/login']);
    }
    return this.user.isAuthenticated;
  }
}
