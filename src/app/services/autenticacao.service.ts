import { Injectable } from '@angular/core';
import { Credenciais } from '../modelos/credenciais';
import { HttpClient } from '@angular/common/http';
import { api_config } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http : HttpClient) { }

  autenticacao(credenciais: Credenciais) {

    return this.http.post(`${api_config.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    })
  }

  loginSucesso(authToken: string) {
    localStorage.setItem('token', authToken);
  }
}
