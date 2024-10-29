import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/modules/Login/services/auth-google.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthGoogleService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permite la navegación
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // Bloquea la navegación
    }
  }
}