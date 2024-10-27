import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/register-city', // Cambia la redirección a la ruta del dashboard
  clientId: '356974843411-e8eh9qourclln99q40q324sithsiedaj.apps.googleusercontent.com', // Asegúrate de que esté correctamente configurado
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
};
