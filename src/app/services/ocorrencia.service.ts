import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocorrencia } from '../modelos/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${API_CONFIG.baseUrl}/ocorrencias`);
  }

  create(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    return this.http.post<Ocorrencia>(`${API_CONFIG.baseUrl}/ocorrencias`, ocorrencia);
  }
}
