import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Servidor } from '../modelos/servidor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Servidor[]> {
    return this.http.get(`${API_CONFIG.baseUrl}/servidores`).pipe(
      map((resposta: Servidor[]) => resposta)
    );
  }
}
