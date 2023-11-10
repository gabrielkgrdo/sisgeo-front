import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './componentes/nav/nav.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaServidorComponent } from './componentes/servidor/lista-servidor/lista-servidor.component';
import { LoginComponent } from './componentes/login/login.component';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { CriarServidorComponent } from './componentes/servidor/criar-servidor/criar-servidor.component';
import { AtualizarServidorComponent } from './componentes/servidor/atualizar-servidor/atualizar-servidor.component';
import { DeletarServidorComponent } from './componentes/servidor/deletar-servidor/deletar-servidor.component';
import { ListaUsuarioComponent } from './componentes/usuario/lista-usuario/lista-usuario.component';
import { CriarUsuarioComponent } from './componentes/usuario/criar-usuario/criar-usuario.component';
import { AtualizarUsuarioComponent } from './componentes/usuario/atualizar-usuario/atualizar-usuario.component';
import { DeletarUsuarioComponent } from './componentes/usuario/deletar-usuario/deletar-usuario.component';
import { ListarOcorrenciaComponent } from './componentes/ocorrencia/listar-ocorrencia/listar-ocorrencia.component';
import { CriarOcorrenciaComponent } from './componentes/ocorrencia/criar-ocorrencia/criar-ocorrencia.component';
import { AtualizarOcorrenciaComponent } from './componentes/ocorrencia/atualizar-ocorrencia/atualizar-ocorrencia.component';
import { LeituraOcorrenciaComponent } from './componentes/ocorrencia/leitura-ocorrencia/leitura-ocorrencia.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MariaDaPenhaComponent } from './componentes/maria-da-penha/maria-da-penha.component';
import { MausTratosComponent } from './componentes/maus-tratos/maus-tratos.component';
import { AcidenteTransitoComponent } from './componentes/acidente-transito/acidente-transito.component';
import { FurtoComponent } from './componentes/furto/furto.component';
import { RouboComponent } from './componentes/roubo/roubo.component';
import { AmeacaComponent } from './componentes/ameaca/ameaca.component';
import { DesaparecimentoPessoaComponent } from './componentes/desaparecimento-pessoa/desaparecimento-pessoa.component';
import { EstelionatoFraudesComponent } from './componentes/estelionato-fraudes/estelionato-fraudes.component';
import { LesaoCorporalComponent } from './componentes/lesao-corporal/lesao-corporal.component';
import { OfensasRaciaisComponent } from './componentes/ofensas-raciais/ofensas-raciais.component';
import { PertubacaoComponent } from './componentes/pertubacao/pertubacao.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {
    path: '', component: NavComponent, canActivate: [AutenticacaoGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'servidores', component: ListaServidorComponent},
      {path: 'servidores/create', component: CriarServidorComponent},
      {path: 'servidores/update/:id', component: AtualizarServidorComponent},
      {path: 'servidores/delete/:id', component: DeletarServidorComponent},

      {path: 'usuarios', component: ListaUsuarioComponent},
      {path: 'usuarios/create', component: CriarUsuarioComponent},
      {path: 'usuarios/update/:id', component: AtualizarUsuarioComponent},
      {path: 'usuarios/delete/:id', component: DeletarUsuarioComponent},

      {path: 'ocorrencias', component: ListarOcorrenciaComponent},
      {path: 'ocorrencias/create', component: CriarOcorrenciaComponent},
      {path: 'ocorrencias/update/:id', component: AtualizarOcorrenciaComponent},
      {path: 'ocorrencias/read/:id', component: LeituraOcorrenciaComponent},
      {path: 'maria-da-penha', component: MariaDaPenhaComponent},
      {path: 'maus-tratos-animais', component: MausTratosComponent},
      {path: 'acidente-transito', component: AcidenteTransitoComponent},
      {path: 'furto', component: FurtoComponent},
      {path: 'roubo', component: RouboComponent},
      {path: 'ameaca', component: AmeacaComponent},
      {path: 'desaparecimento-de-pessoa', component: DesaparecimentoPessoaComponent},
      {path: 'estelionato-fraudes-apropriacoes', component: EstelionatoFraudesComponent},
      {path: 'lesao-corporal', component: LesaoCorporalComponent},
      {path: 'ofensas-raciais', component: OfensasRaciaisComponent},
      {path: 'pertubacao', component: PertubacaoComponent},
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
