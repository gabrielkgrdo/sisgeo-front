import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Servidor } from 'src/app/modelos/servidor';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-criar-servidor',
  templateUrl: './criar-servidor.component.html',
  styleUrls: ['./criar-servidor.component.css']
})
export class CriarServidorComponent implements OnInit {

  servidor: Servidor = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cpf: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  senha: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private service: ServidorService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.servidor).subscribe(() => {
      this.alert.success('Servidor cadastrado com sucesso', 'Cadastro');
    }, ex => {
      console.log(ex);
    })
  }

  addPerfil(perfil: any): void {
    
    if(this.servidor.perfis.includes(perfil)){
      this.servidor.perfis.splice(this.servidor.perfis.indexOf(perfil),1);
      console.log(this.servidor.perfis);   
    }else{
      this.servidor.perfis.push(perfil);
      console.log(this.servidor.perfis);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid
    && this.email.valid && this.senha.valid
  }
}

