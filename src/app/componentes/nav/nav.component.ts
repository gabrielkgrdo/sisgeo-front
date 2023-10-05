import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(
    private router: Router,
    public autenticacaoServico: AutenticacaoService,
    private alertLogout: ToastrService
    ) { }

  ngOnInit(): void {
    this.router.navigate(['home'])

  }

  logout() {
    this.router.navigate(['login'])
    this.autenticacaoServico.logout();
    this.alertLogout.info('Logout realizado com sucesso!', 'Logout', {timeOut: 7000})
  }

}
