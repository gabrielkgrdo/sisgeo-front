import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';

@Component({
  selector: 'app-listar-ocorrencia',
  templateUrl: './listar-ocorrencia.component.html',
  styleUrls: ['./listar-ocorrencia.component.css']
})
export class ListarOcorrenciaComponent implements OnInit {
  OCORRENCIA_INFO: Ocorrencia[] = [];
  FILTRAR_DADOS: Ocorrencia[] = [];
  selectedStatus: string = '';

  displayedColumns: string[] = ['id', 'titulo', 'usuario', 'servidor', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource: MatTableDataSource<Ocorrencia>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: OcorrenciaService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.OCORRENCIA_INFO = resposta;
      this.FILTRAR_DADOS = resposta; // Inicializa FILTRAR_DADOS com a mesma lista no início
      console.log('Ocorrências filtradas:', this.FILTRAR_DADOS);
      this.dataSource = new MatTableDataSource<Ocorrencia>(this.OCORRENCIA_INFO);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  status(status: string): string {
    switch (status) {
      case '0':
        return 'ABERTO';
      case '1':
        return 'EM ANDAMENTO';
      default:
        return 'ENCERRADO';
    }
  }

  ordenaStatus(status: string): void {
    console.log('Filtrando por status:', status);
  
    if (status === this.selectedStatus) {
      this.selectedStatus = ''; // Desmarca o botão se ele já estiver selecionado
    } else {
      this.selectedStatus = status;
    }
  
    if (this.selectedStatus === '') {
      // Se não houver um status selecionado, exiba todos os dados
      this.FILTRAR_DADOS = this.OCORRENCIA_INFO;
    } else {
      this.FILTRAR_DADOS = this.OCORRENCIA_INFO.filter((element) => element.status === status);
    }
  
    console.log('Ocorrências filtradas:', this.FILTRAR_DADOS);
    this.dataSource = new MatTableDataSource<Ocorrencia>(this.FILTRAR_DADOS);
    this.dataSource.paginator = this.paginator;
  }
  
  
}
