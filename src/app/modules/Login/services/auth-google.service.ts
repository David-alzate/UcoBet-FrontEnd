import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/shared/auth-config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private profileSubject = new BehaviorSubject<any>(null); // Cambiado a BehaviorSubject
  profile$ = this.profileSubject.asObservable(); // Observable para el perfil

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        const claims = this.oAuthService.getIdentityClaims();
        this.profileSubject.next(claims); // Emitir el perfil cuando hay un token válido
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profileSubject.next(null); // Emitir null al cerrar sesión
  }

  get identityClaims() {
    return this.oAuthService.getIdentityClaims();
  }

  get accesToken() {
    return this.oAuthService.getAccessToken();
  }

  userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";

    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accesToken}`
      }
    });
  }
  
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
}
