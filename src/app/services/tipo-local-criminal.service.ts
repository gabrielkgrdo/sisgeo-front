import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoLocalCriminalService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getLocais() {
    return this.http.get(`${this.apiUrl}/tipo-local-criminal`);
  }
}
