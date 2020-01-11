import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    ) {
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      return this.authService.isLoggedIn();
    } else {
      this.router.navigate(['/login']);
      return this.authService.isLoggedIn();
    }
  }
}
