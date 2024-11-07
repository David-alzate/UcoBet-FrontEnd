import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGoogleService } from '../../Login/services/auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private API_SERVER = "https://localhost:8080/general/api/v1/cities";

  constructor(
    private httpCliente: HttpClient,
    private authGoogleService: AuthGoogleService 
  ) {}

  public saveCity(city: any): Observable<any> {
    const token = this.authGoogleService.idToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpCliente.post(this.API_SERVER, city, { headers });
  }

  public getAllCities(): Observable<any> {
    const token = this.authGoogleService.idToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpCliente.get(this.API_SERVER, { headers });
  }
}