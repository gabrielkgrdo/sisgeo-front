import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-leitura-ocorrencia',
  templateUrl: './leitura-ocorrencia.component.html',
  styleUrls: ['./leitura-ocorrencia.component.css']
})
export class LeituraOcorrenciaComponent implements OnInit {

  dataInicioFormatada: string;
  dataFimFormatada: string;

  ocorrencia: Ocorrencia ={
    id: undefined,
    dataAbertura: undefined,
    dataFechamento: undefined,
    prioridade: '',
    status: '',
    titulo: '',
    descricao: '',
    servidor: null,
    usuario: undefined,
    nomeUsuario: '',
    nomeServidor: '',
    tipoOcorrencia: {
        id: undefined,
        nome: ''
    },
    cidade: {
        id: undefined,
        nome: ''
    },
    complemento: '',
    dataInicio: '',
    dataFim: '',
    horaInicio: '',
    horaFim: '',
    quadra: '',
    setorArea: {
        id: undefined,
        nome: ''
    },
    tipoLocalCriminal: {
        id: undefined,
        nomeLocal: ''
    },
    meioEmpregado: [],
    dataInicioFormatada: '',
    dataFimFormatada: '',
};




  constructor(
    private servicoOcorrencia: OcorrenciaService,
    private alerta: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.ocorrencia.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.servicoOcorrencia.findById(this.ocorrencia.id).subscribe(resposta => {
      this.ocorrencia = resposta;

      if (this.ocorrencia.dataInicio) {
        this.ocorrencia.dataInicioFormatada = this.datePipe.transform(this.ocorrencia.dataInicio, 'dd/MM/yyyy');
      }
  
      if (this.ocorrencia.dataFim) {
        this.ocorrencia.dataFimFormatada = this.datePipe.transform(this.ocorrencia.dataFim, 'dd/MM/yyyy');
      }
      console.log(this.ocorrencia);
    }, ex => {
      this.alerta.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string{
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string{
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  getMeiosEmpregados(): string {
    if (this.ocorrencia.meioEmpregado) {
      return this.ocorrencia.meioEmpregado.map(meio => meio.nomeMeioEmpregado).join(', ');
    }
    return '';
  }
  

}