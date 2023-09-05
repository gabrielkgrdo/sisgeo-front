import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-ocorrencia',
  templateUrl: './criar-ocorrencia.component.html',
  styleUrls: ['./criar-ocorrencia.component.css']
})
export class CriarOcorrenciaComponent implements OnInit {

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  descricao: FormControl = new FormControl(null, [Validators.required])
  servidor: FormControl = new FormControl(null, [Validators.required])
  usuario: FormControl = new FormControl(null, [Validators.required])

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.titulo.valid && this.prioridade.valid && this.status.valid &&
    this.servidor.valid && this.usuario.valid && this.descricao.valid
  }

}
