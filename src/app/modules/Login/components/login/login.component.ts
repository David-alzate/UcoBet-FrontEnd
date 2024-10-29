import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userProfile: any;
  loading = false;
  loginForm: FormGroup;
  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  ngOnInit() {
    // Suscripción para obtener el perfil de usuario de Google
    this.authService.profile$.subscribe(
      (profile: any) => {
        console.log(profile); // Verifica el perfil en la consola
        this.userProfile = profile;
      },
      (error) => {
        console.error("Error al cargar el perfil:", error);
      }
    );
  }

  constructor(public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private authService = inject(AuthGoogleService);

  get isLogged() {
    return this.authService.isLoggedIn(); 
  }

  signInWithGoogle() {
    this.authService.login();
  }

  iniciarSesion() {
    // Implementa la lógica de inicio de sesión si es necesario
  }
}
