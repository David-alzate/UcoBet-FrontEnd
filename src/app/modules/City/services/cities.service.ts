import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private API_SERVER = "http://localhost:8080/general/api/v1/cities"

  constructor(private httpCliente: HttpClient) { }

  public saveCity(city: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, city);
  }
}
