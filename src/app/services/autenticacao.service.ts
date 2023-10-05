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
      responseType: 'text',
    });
  }

  loginSucesso(token: string) {
    localStorage.setItem('token', token);
    console.log('Token armazenado no localStorage:', token);
  }

  estaAutenticado() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jtwService.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isUserAdmin(): boolean {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jtwService.decodeToken(token);
      const roles = decodedToken.roles; // Suponha que as roles estejam armazenadas na propriedade 'roles' do token

      if (Array.isArray(roles)) {
        return roles.some(role => role.authority === 'ROLE_ADMIN');
      }
    }

    return false;
  }

  logout(){
    localStorage.clear();
  }
}
