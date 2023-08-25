import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servidor } from 'src/app/modelos/servidor';

@Component({
  selector: 'app-lista-servidor',
  templateUrl: './lista-servidor.component.html',
  styleUrls: ['./lista-servidor.component.css']
})
export class ListaServidorComponent implements OnInit {
  
  SERVIDOR_INFO: Servidor [] = [
    {
      id: 1,
      nome: 'Kleyber Gabriel',
      cpf: '123.456.789-10',
      email: 'kleyber@mail.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '25/08/2023'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Servidor>(this.SERVIDOR_INFO);

  constructor() { }

  ngOnInit(): void {
  }
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
