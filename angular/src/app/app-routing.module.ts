import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import {  TransaccionesComponent} from './componentes/transacciones/transacciones.component';
import {FormularioTransaccionesComponent} from './componentes/formulario-transacciones/formulario-transacciones.component';
import {FormularioUsuariosComponent} from './componentes/formulario-usuarios/formulario-usuarios.component';


const routes: Routes = [

  {path:"account",component:UsuariosComponent},
  {path:"transactions",component:TransaccionesComponent},
  {path:"account/formAccount", component:FormularioUsuariosComponent},
  {path:"transactions/formTransactions",component:FormularioTransaccionesComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
