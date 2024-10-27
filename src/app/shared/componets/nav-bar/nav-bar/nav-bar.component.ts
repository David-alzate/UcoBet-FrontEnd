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

  constructor(
    private router: Router,
    private authService: AuthGoogleService,
    private cdRef: ChangeDetectorRef // Agregado para manejar la detección de cambios manualmente
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.profileSubscription = this.authService.profile$.subscribe(profile => {
      this.userProfile = profile; // Asigna el perfil al componente

      if (profile) {
        // Si hay un perfil, cargar la imagen de usuario desde la API
        this.authService.userProfile().subscribe((data: any) => {
          this.userProfile.picture = data.picture; // Actualiza la imagen de perfil
          
          // Forzar la detección de cambios
          this.cdRef.detectChanges();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe(); // Limpia la suscripción
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
