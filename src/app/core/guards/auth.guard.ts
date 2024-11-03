import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthGoogleService } from 'src/app/modules/Login/services/auth-google.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthGoogleService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
