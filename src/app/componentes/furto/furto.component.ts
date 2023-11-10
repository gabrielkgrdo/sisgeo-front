import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { MeioEmpregadoService } from 'src/app/services/meio-empregado.service';
import { TipoLocalCriminalService } from 'src/app/services/tipo-local-criminal.service';

@Component({
  selector: 'app-furto',
  templateUrl: './furto.component.html',
  styleUrls: ['./furto.component.css']
})
export class FurtoComponent implements OnInit {

  formulario: FormGroup;
  cidades: any[]; // Armazena a lista de cidades
  cidadeSelecionada: number; // Armazena a cidade selecionada
  setores: any[];
  setorSelecionado: number; 
  locais: any[];
  tipoLocalSelecionado: number;
  meiosEmpregados: any[] = [];
  meiosEmpregadosSelecionados: number[] = [];
  selectedUF: string = 'DF';
  dataInicio: string;
  horaInicio: string;
  dataFim: string;
  horaFim: string;
  quadra: string;
  complemento: string;
  descricao: string;
  idUsuario: number;


  constructor(private http: HttpClient,
    private cidadeService: CidadeService,
    private tipoLocalService: TipoLocalCriminalService,
    private meioEmpregadoService: MeioEmpregadoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private servicoAutenticacao: AutenticacaoService
  ) { }

  ngOnInit() {
    this.cidadeService.getCidades().subscribe((data: any[]) => {
      this.cidades = data;
    });
    this.tipoLocalService.getLocais().subscribe((data: any[]) => {
      this.locais = data;
    });
    this.meioEmpregadoService.getMeiosEmpregados().subscribe((data: any[]) => {
      this.meiosEmpregados = data;
    });
    this.formulario = this.formBuilder.group({
      // Defina os seus campos de formulário aqui
      dataInicio: new FormControl(),
      horaInicio: new FormControl(),
      dataFim: new FormControl(),
      horaFim: new FormControl(),
      quadra: new FormControl(),
      complemento: new FormControl(),
      descricao: new FormControl(),
      cidadeSelecionada: new FormControl(),
      setorSelecionado: new FormControl(),
      tipoLocalSelecionado: new FormControl(),
      // ... Outros campos de formulário
    });
    // this.idUsuario = this.servicoAutenticacao.getUsuarioId();

  }

  salvarNoBanco() {
    // Aqui você pode enviar os valores para o backend e salvar no banco de dados
    console.log('Data de Início:', this.dataInicio);
    console.log('Hora de Início:', this.horaInicio);
    console.log('Data de Término:', this.dataFim);
    console.log('Hora de Término:', this.horaFim);
    console.log('Quadra:', this.quadra);
    console.log('Complemento:', this.complemento);
    console.log('Descrição:', this.descricao);
    
    
    // Exemplo de como enviar os dados para o backend usando um serviço
    // this.meuServico.salvarDadosNoBanco(this.dataInicio, this.horaInicio, this.dataFim, this.horaFim)
    //   .subscribe(response => {
    //     console.log('Dados salvos com sucesso:', response);
    //   });
  }



  getTiposLocaisCriminais() {
    return this.http.get('http://localhost:8080/tipos-locais-criminais');
  }

  tipoLocalSelecionadoChange() {
    console.log('ID do local selecionado:', this.tipoLocalSelecionado);
  }

  addMeioEmpregadoId(numero: number): void {
    if (this.meiosEmpregadosSelecionados.includes(numero)) {
      // Se o número já estiver no array, remova-o
      this.meiosEmpregadosSelecionados = this.meiosEmpregadosSelecionados.filter(item => item !== numero);
    } else {
      // Caso contrário, adicione-o ao array
      this.meiosEmpregadosSelecionados.push(numero);
    }

    // Imprima no console os números armazenados
    console.log('Números armazenados:', this.meiosEmpregadosSelecionados);
  }

  // enviarMeiosEmpregadosParaBancoDeDados() {
  //   console.log('IDs dos meios empregados selecionados:', this.meiosEmpregadosSelecionados);
  //   // Envie esta lista para o seu servidor e salve no banco de dados
  //   // Lide com a lógica de envio no seu serviço HTTP
  // }

  enviarDadosParaEndpoint() {
    const dados = {
      dataInicio: this.dataInicio,
      horaInicio: this.horaInicio,
      dataFim: this.dataFim,
      horaFim: this.horaFim,
      quadra: this.quadra,
      complemento: this.complemento,
      descricao: this.descricao,
      cidade: {id: this.cidadeSelecionada}, // Substitua cidades pelo nome do seu array de cidades
      setorArea: {id: this.setorSelecionado}, // Substitua setores pelo nome do seu array de setores
      tipoLocalCriminal: {
        id: this.tipoLocalSelecionado
      },
      meioEmpregadoIds: this.meiosEmpregadosSelecionados,
      usuario: {id: Number(this.servicoAutenticacao.getUsuarioId())}
    
      // Adicione outros campos de formulário, se necessário
    };
  
    // Realize uma solicitação HTTP POST para o endpoint
    this.http.post('http://localhost:8080/furto', dados).subscribe(response => {
      // Lide com a resposta do servidor, se necessário
      console.log('Resposta do servidor:', response);
      this.toastr.success('Ocorrência criada com sucesso!', 'Sucesso');
      this.router.navigate(['/home']);
    },
    (error) => {
      // Lidar com erros
      console.error('Erro ao criar a ocorrência:', error);
      this.toastr.error('Erro ao criar a ocorrência. Por favor, tente novamente.', 'Erro');
      // Adicione outras ações de erro, se necessário
    }
    );
  }
  

  cidadeSelecionadaChange() {
    // Aqui você pode enviar o ID da cidade selecionada para o seu back-end
    console.log('ID da cidade selecionada:', this.cidadeSelecionada);

    // Chame a função para buscar setores com base no ID da cidade
    this.buscarSetoresPorCidade(this.cidadeSelecionada);
  }

  buscarSetoresPorCidade(cidadeId: number) {
    // Use o HttpClient para enviar uma solicitação HTTP ao seu back-end
    // Substitua localhost:8080 pelo URL real do seu back-end
    this.http.get(`http://localhost:8080/setores/cidade/${cidadeId}`).subscribe((response: any[]) => {
      // Lide com a resposta do back-end (os setores relacionados à cidade selecionada)
      console.log('Setores retornados:', response);
      this.setores = response;
    });
  }
}
