import { Component, Injectable, OnInit } from '@angular/core';
import { TransaccionesService} from './../../servicios/transacciones.service';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, throwError, timer} from 'rxjs';
import { catchError, filter, take, switchMap,timeout} from 'rxjs/operators';



@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'],


})
export class TransaccionesComponent implements OnInit ,HttpInterceptor  {
  [x: string]: any;
  transacciones: any= [];
  router:any= [];
  loading = false;
  timesCalledFakeCheck = 0;


   constructor(private transaccionesService:TransaccionesService) {
    console.log(this.breakingBadData)
  }


  ngOnInit(): void {
    this.transaccionesService.getTransacciones().subscribe(
      (res:any) =>{
      this.transacciones= res.result;
      console.log(this.transacciones)
     },
    err => console.log(err)
    )
  }

  deleteTransacciones(id:string) {
    this.transaccionesService.deleteTransacciones(id).subscribe(
      (res:any) => {
        this.transacciones= res.result;
        console.log(this.transacciones)
        },
        err => console.error(err)
      )
  }

   /////Long Polling////////////////

   onSave() {
    this.loading = true;

    this.apiUpdate()
      .then(results => {
        console.log('START LONG POLLING');

        this.longPoll(results.id)
          .pipe(timeout(3000)) //ACTUALIZAR a un número bajo para probar el tiempo de espera.
          .subscribe(
            (response) => {
              this.loading = false;
              console.log('DONE.');
              // closeDialog();
            },
            (error) => {
              this.loading = false;
              console.log('ERRORED.');
              //showWarningToUser();
            }
          );
      })
      .catch(() => {
        console.log('apiUpdate fallido');
        //Mostrar advertencia al usuario.();
      });
    }

    longPoll(trxId: any): Observable<any> {
      // ACTUALIZA EL 2º NÚMERO DEL TEMPORIZADOR A LA MS QUE QUIERES ENCUESTAR - El primer número 0 significa que comienza inmediatamente
      return timer(0, 5000).pipe(
        switchMap(() => this.apiCheckIfFinished( trxId )),//Cambiar mapa cancelará automáticamente las solicitudes http pendientes anteriores
         filter(isDone => !!isDone), //Bloquear la respuesta de la API para que no continúe hasta que finalice el estado
         take(1) // Salga tan pronto como la API devuelva un estado de finalización que pasó el filtro
      );
    }


    apiUpdate(): Promise<any> {
      console.log('Llamaste a apiUpdate');
      return new Promise(resolve =>
        setTimeout(() => {
          console.log('Respuesta de apiUpdate: Empieza.....');
          resolve({ id: '123' });
        }, 500)
      );
    }

    apiCheckIfFinished( trxId: any ): Promise<boolean> {
      console.log('Llamara a apiCheckIfFinished');
      return new Promise(resolve =>
        setTimeout(() => {
          const response = ++this.timesCalledFakeCheck > 0 ? true : false;
          console.log('Respuestas de  apiCheckIfFinished: ' + response);
          resolve(response);
        }, 500)
      );
    }


   /////Long Polling/////////////////////////////////////////////







  /////PDF////////////////
  downloadPdf(){
    const DATA: any =document.getElementById('htmldata');
    const doc= new jsPDF('p','pt','a4');
    const options ={
      background:'white',
      scale:3,
    };

    html2canvas(DATA, options)
      .then((canvas) =>{
      const img = canvas.toDataURL('image/PNG');

     const bufferX= 15;
     const bufferY=15;
     const imgProps =(doc as any).getImageProperties(img);
     const pdfWidht= doc.internal.pageSize.getWidth() -2 * bufferX;
     const pdfHeight =(imgProps.height*pdfWidht) /imgProps.width;
     doc.addImage(
      img,
      'PNG',
      bufferX,
      bufferY,
      pdfWidht,
      pdfHeight,
      undefined,
      'FAST'
     );

     return doc;
    })
    .then((docResult) => {
      docResult.save(`${new Date().toISOString()}.PDF`);
    })
  }
  /////PDF////////////////////////////////////.


  /////////////interceptor/////////////
 intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

 const headers=new HttpHeaders({
  'token-users': '3435dddd'
 });

 const reqClone = req.clone({
  headers
 });

 return next.handle(reqClone).pipe(
  catchError(this.manejarError)
 )

 }

 manejarError(error: HttpErrorResponse){
  console.log('Sucedio un error(interceptor): ');
  console.log('Registrado en el archivo de registro.');
  console.warn(error);
  return throwError('Error persolizado');
 }
/////////////interceptor/////////////.




}
