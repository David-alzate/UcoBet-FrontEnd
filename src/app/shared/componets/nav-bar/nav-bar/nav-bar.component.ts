import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  showNavbar: boolean = true;

  constructor(private router: Router) {
    // Detecta los cambios en la navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta el navbar cuando la ruta es '/login'
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  logout(){
    
  }
}
