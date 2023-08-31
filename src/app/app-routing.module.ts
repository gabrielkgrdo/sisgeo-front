import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './componentes/nav/nav.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListaServidorComponent } from './componentes/servidor/lista-servidor/lista-servidor.component';
import { LoginComponent } from './componentes/login/login.component';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, /*canActivate: [AutenticacaoGuard],*/ children: [
      {path: 'home', component: HomeComponent},
      {path: 'servidores', component: ListaServidorComponent}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
