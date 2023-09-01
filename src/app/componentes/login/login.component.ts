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
    console.log('Iniciando o processo de login...');
  
    this.service.autenticacao(this.credenciais).subscribe(
      (resposta) => {
        console.log('Solicitação de autenticação bem-sucedida:', resposta);
  
        const authorizationHeader = resposta.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.substring(7);
          this.service.loginSucesso(token);
          console.log('Token armazenado no localStorage:', token);
          this.router.navigate(['home']);
          console.log('Token de autorização obtido e armazenado com sucesso:', token);
        } else {
          this.alert.error('O servidor não retornou um token de autorização.');
        }
      },
      (error) => {
        console.error('Erro ao fazer a solicitação de autenticação:', error);
        this.alert.error('Usuário e/ou senha inválidos');
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
