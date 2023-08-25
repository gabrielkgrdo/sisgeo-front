import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/modelos/credenciais';

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

  constructor(private alert: ToastrService) { }

  ngOnInit(): void {
  }

  logar(){
    this.alert.error('Usuário e/ou senha inválidos!','Login');
    this.credenciais.senha = '';
  }

  validaCampos(): boolean {
    if(this.email.valid && this.senha.valid){
      return true;
    }return false
  }
}
