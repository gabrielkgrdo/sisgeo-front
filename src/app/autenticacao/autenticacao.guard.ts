import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})

  
export class AutenticacaoGuard implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let autenticado = this.autenticacaoService.estaAutenticado();

    if(autenticado){
      return true
    }
    this.router.navigate(['login']);
    return false
  }
  
}
