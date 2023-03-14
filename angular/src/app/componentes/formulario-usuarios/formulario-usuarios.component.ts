import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css']
})
export class FormularioUsuariosComponent implements OnInit {
  [x: string]: any;
  usuarioss!: FormGroup;
  UsuariosService: any;
  usuario: Usuario[]=[]

  constructor(private  fb: FormBuilder,  private usuService: UsuariosService, private router: Router) {
    this.usuarioss = this.fb.group({
      id:['',Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      date_joined: ['', Validators.required],



    })


   }

  ngOnInit(): void {
  }

  crear_usuarios(){

    
    this.usuService.saveUsuario( this.usuarioss.value).subscribe()
    this.router.navigate(['account']);
 }


}
