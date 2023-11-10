import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getCidades() {
    return this.http.get(`${this.apiUrl}/cidades`);
  }
}
