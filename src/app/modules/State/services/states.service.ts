import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private API_SERVER = "http://localhost:8080/general/api/v1/states"

  constructor(private httpCliente: HttpClient) { }

  public getAllStates(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }
}
