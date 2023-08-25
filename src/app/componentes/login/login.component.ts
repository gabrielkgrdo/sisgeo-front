import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/modelos/credenciais';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = {
    email: '',
    senha: '',
  }

  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  constructor(
    private alert: ToastrService,
    private service: AutenticacaoService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  logar(){
    this.service.autenticacao(this.credenciais).subscribe(resposta => {
      this.service.loginSucesso(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    }, () => {
      this.alert.error('Usuário e/ou senha inválidos');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
