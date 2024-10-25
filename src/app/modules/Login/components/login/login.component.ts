import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  socialUser: SocialUser | null = null;
  isLogged: boolean = false;
  loading = false; // Nueva variable para el estado de carga
  loginForm: FormGroup;
  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  constructor(
    public fb: FormBuilder,
    private authService: SocialAuthService,
    private cdr: ChangeDetectorRef,
    private router: Router // Inyectar el servicio Router
  ) { 
    this.loginForm = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("Initial isLogged:", this.isLogged); // Verifica el valor inicial
    this.authService.authState.subscribe(
      (user) => {
          this.loading = false;
          if (user) {
              this.socialUser = user;
              this.isLogged = true;
              this.cdr.detectChanges(); // Forzar la detección de cambios aquí
              this.router.navigateByUrl('/register-city');
          } else {
              this.socialUser = null;
              this.isLogged = false;
              this.cdr.detectChanges(); // Forzar la detección de cambios aquí también
          }
      }
  );  
}


  ngAfterViewInit(): void {
    this.loadGoogleScript(() => {
      google.accounts.id.initialize({
        client_id: '356974843411-e8eh9qourclln99q40q324sithsiedaj.apps.googleusercontent.com',
        callback: (response: any) => this.handleCredentialResponse(response)
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    });
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token:", response.credential);

    if (response.credential) {
        this.loading = true;
        this.cdr.detectChanges(); // Forzar la actualización de la UI
        this.isLogged = true; // Revisa si esta línea está causando que `isLogged` sea `true` incorrectamente

        // Información del usuario para el ejemplo
        this.socialUser = new SocialUser();
        this.socialUser.name = "Usuario de Google";
        this.cdr.detectChanges();
        setTimeout(() => {
            this.router.navigateByUrl('/register-city');
            this.loading = false;
        }, 1000);
    }
}


  private loadGoogleScript(callback: () => void): void {
    const existingScript = document.getElementById('google-jssdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-jssdk';
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    } else {
      callback();
    }
  }

  logOut(): void {
    this.authService.signOut().then(() => {
      this.isLogged = false;
      this.socialUser = null;
      console.log("User logged out.");
      this.cdr.detectChanges(); // Forzar la actualización de la UI
    });
  }

  iniciarSesion(){}
}
