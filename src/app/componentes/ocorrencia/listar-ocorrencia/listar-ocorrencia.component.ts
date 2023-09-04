import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ocorrencia } from 'src/app/modelos/chamado';

@Component({
  selector: 'app-listar-ocorrencia',
  templateUrl: './listar-ocorrencia.component.html',
  styleUrls: ['./listar-ocorrencia.component.css']
})
export class ListarOcorrenciaComponent implements OnInit {

  OCORRENCIA_INFO: Ocorrencia [] = [
    {
      id: 1,
      dataAbertura: '04/09/2023',
      dataFechamento: '04/09/2023',
      prioridade: 'ALTA',
      status: 'Andamento',
      titulo: 'chamado 1',
      descricao: 'teste chamado 1',
      servidor: 1,
      usuario: 6,
      nomeUsuario: 'biel sales',
      nomeServidor: 'kleyber gabriel',
    }
  ]

  displayedColumns: string[] = ['id', 'titulo', 'usuario', 'servidor', 'dataAbertura','prioridade', 'status', 'acoes',];
  dataSource = new MatTableDataSource<Ocorrencia>(this.OCORRENCIA_INFO);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
