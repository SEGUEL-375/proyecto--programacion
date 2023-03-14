import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/modelos/transaccion';

@Component({
  selector: 'app-formulario-transacciones',
  templateUrl: './formulario-transacciones.component.html',
  styleUrls: ['./formulario-transacciones.component.css']
})
export class FormularioTransaccionesComponent implements OnInit {

  transaccionn!: FormGroup;

  transaccionesService: any;
  transacciones: any= [];
  transaccion: Transaccion[]=[]

  constructor(private fb: FormBuilder, private tranService: TransaccionesService, private router: Router) {

    this.transaccionn = this.fb.group({
      id: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      cantidad: ['', Validators.required],
      fecha_realizada: ['', Validators.required],

    })

  }

  ngOnInit(): void {


  }
  crear_transaccion(){


this.tranService.saveTransacciones(this.transaccionn.value).subscribe()



    this.router.navigate(['transactions']);


}
  }

