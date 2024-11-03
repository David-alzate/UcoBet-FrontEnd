import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/shared/auth-config';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private profileSubject = new ReplaySubject<any>(1);
  profile$ = this.profileSubject.asObservable();

  private isLoggedInSubject = new ReplaySubject<boolean | null>(1);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private lastLoggedInStatus: boolean | null = null;

  constructor() {
    this.initConfiguration();
    this.isLoggedIn$.subscribe(status => this.lastLoggedInStatus = status);
  }

  loadUserProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${this.accesToken}` }
    }).subscribe(
      profile => {
        this.profileSubject.next(profile);
        console.log("Perfil de usuario cargado:", profile);
      },
      error => {
        console.error("Error al cargar el perfil:", error);
      }
    );
  }

  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        this.isLoggedInSubject.next(true);
        this.loadUserProfile();
      } else {
        this.isLoggedInSubject.next(false);
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.isLoggedInSubject.next(true);
        this.loadUserProfile();
      }
    });
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.isLoggedInSubject.next(false);
    this.profileSubject.next(null);
  }

  get identityClaims() {
    return this.oAuthService.getIdentityClaims();
  }

  get accesToken() {
    return this.oAuthService.getAccessToken();
  }

  get idToken(): string | null {
    return this.oAuthService.getIdToken();
  }

  userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accesToken}`
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.lastLoggedInStatus;
  }
}
