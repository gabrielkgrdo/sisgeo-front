import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { Servidor } from 'src/app/modelos/servidor';
import { Usuario } from 'src/app/modelos/usuario';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-atualizar-ocorrencia',
  templateUrl: './atualizar-ocorrencia.component.html',
  styleUrls: ['./atualizar-ocorrencia.component.css']
})
export class AtualizarOcorrenciaComponent implements OnInit {

  ocorrencia: Ocorrencia ={
    prioridade: '',
    status: '',
    titulo: '',
    descricaoOcorrencia: '',
    servidor: null,
    usuario: '',
    nomeUsuario: '',
    nomeServidor: '',
  }

  usuarios: Usuario[] = []
  servidores: Servidor[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  descricao: FormControl = new FormControl(null, [Validators.required])
  servidor: FormControl = new FormControl(null, [Validators.required])
  usuario: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private servicoOcorrencia: OcorrenciaService,
    private servicoUsuario: UsuarioService,
    private servicoServidor: ServidorService,
    private alerta: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ocorrencia.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllUsuarios();
    this.findAllServidores();
  }

  findById(): void {
    this.servicoOcorrencia.findById(this.ocorrencia.id).subscribe(resposta => {
      this.ocorrencia = resposta;
      console.log('Resposta do findById:', resposta);
    }, ex => {
      this.alerta.error(ex.error.error);
      console.error('Erro no findById:', ex);
    })
  }

  logServidorSelection() {
    console.log('Servidor selecionado:', this.ocorrencia.servidor.id);
  }

  logStatusSelection() {
    console.log('Status selecionado:', this.ocorrencia.status);
  }
  
  logPrioridadeSelection() {
    console.log('Prioridade selecionada:', this.ocorrencia.prioridade);
  }
  
  
  

  update(): void {
    const data = {
      servidor: { id: this.ocorrencia.servidor.id },
      status: this.ocorrencia.status,
      prioridade: this.ocorrencia.prioridade.toString(),
    };
  
    this.ocorrencia.servidor = data.servidor as Partial<Servidor>; // Convertemos para Partial<Servidor>
  
    this.servicoOcorrencia.update(this.ocorrencia).subscribe(
      (resposta) => {
        this.alerta.success('Ocorrência atualizada com sucesso!', 'Aviso:');
        this.router.navigate(['ocorrencias']);
      },
      (ex) => {
        this.alerta.error(ex.error.error);
      }
    );
  }
  
  
  
  
  

  findAllUsuarios(): void{
    this.servicoUsuario.findAll().subscribe(resposta => {
      this.usuarios = resposta;
    })  
  }

  findAllServidores(): void{
    this.servicoServidor.findAll().subscribe(resposta => {
      this.servidores = resposta;
    })
  }  

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid &&
    this.servidor.valid 
  }

  retornaStatus(status: any): number {
    if (status === 'ABERTO') {
      return 0;
    } else if (status === 'EM ANDAMENTO') {
      return 1;
    } else {
      return 2;
    }
  }
  
  retornaPrioridade(prioridade: any): number {
    if (prioridade === 'BAIXA') {
      return 0;
    } else if (prioridade === 'MÉDIA') {
      return 1;
    } else {
      return 2;
    }
  }
  

}

