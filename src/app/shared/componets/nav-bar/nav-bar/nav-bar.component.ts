import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/modules/Login/services/auth-google.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  showNavbar: boolean = true;
  isLoggedIn: boolean = false;
  userProfile: any;
  private profileSubscription!: Subscription;
  token: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthGoogleService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  ngOnInit(): void {
    this.profileSubscription = this.authService.profile$.subscribe(profile => {
      this.userProfile = profile;
      this.isLoggedIn = !!profile;
      this.token = this.authService.idToken;
      console.log("ID Token:", this.token);
    });
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
