import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGoogleService } from '../../Login/services/auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private API_SERVER = "https://localhost:8080/general/api/v1/states";

  constructor(
    private httpCliente: HttpClient,
    private authGoogleService: AuthGoogleService 
  ) {}

  public getAllStates(): Observable<any> {
    const token = this.authGoogleService.idToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpCliente.get(this.API_SERVER, { headers });
  }
}
