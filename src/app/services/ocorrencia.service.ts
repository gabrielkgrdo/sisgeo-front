import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocorrencia } from '../modelos/chamado';
import { API_CONFIG } from '../config/api.config';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private http: HttpClient,
              private authService: AutenticacaoService
    ) { }

  findAll(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${API_CONFIG.baseUrl}/ocorrencias`);
  }

  findById(id: any): Observable<Ocorrencia> {
    return this.http.get<Ocorrencia>(`${API_CONFIG.baseUrl}/ocorrencias/${id}`);
  }

  create(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    const usuarioNome = this.authService.getNomeUsuario();
    ocorrencia.usuario = usuarioNome;

    return this.http.post<Ocorrencia>(`${API_CONFIG.baseUrl}/ocorrencias`, ocorrencia);
  }

  update(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    return this.http.put<Ocorrencia>(`${API_CONFIG.baseUrl}/ocorrencias/${ocorrencia.id}`, ocorrencia);
  }
}
