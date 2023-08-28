import { Injectable } from '@angular/core';
import { Credenciais } from '../modelos/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  jtwService: JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient) { }

  autenticacao(credenciais: Credenciais) {

    return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    })
  }

  loginSucesso(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  estaAutenticado() {
    let token = localStorage.getItem('token');
    if (token != null) {
      // Passe o valor da variável 'token' para isTokenExpired, não a string 'token'
      return !this.jtwService.isTokenExpired(token);
    }
    return false;
  }
}
