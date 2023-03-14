import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { TransaccionesComponent } from './componentes/transacciones/transacciones.component';
import { ObjToArrayPipe } from './objToArray.pipe';
import { FormularioUsuariosComponent } from './componentes/formulario-usuarios/formulario-usuarios.component';
import { FormularioTransaccionesComponent } from './componentes/formulario-transacciones/formulario-transacciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    UsuariosComponent,
    TransaccionesComponent,
    ObjToArrayPipe,
    FormularioUsuariosComponent,
    FormularioTransaccionesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TransaccionesComponent,
      ///para que este pendiente de las peticiones que vamos a realizar:
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
