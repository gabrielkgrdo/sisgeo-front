import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeioEmpregadoService {

  constructor(private http: HttpClient) { }

  getMeiosEmpregados() {
    return this.http.get('http://localhost:8080/meio-empregado');
  }
}
