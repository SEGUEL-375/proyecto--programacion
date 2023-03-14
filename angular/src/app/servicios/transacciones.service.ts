import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '../modelos/transaccion';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {




  API_URI = 'http://localhost:3009';
 

  constructor(private http: HttpClient) { }

  crear_transaccion(transaccionn:Transaccion):Observable<Transaccion> {
    return this.http.post(`${this.API_URI}/transactions`,transaccionn);
  }
  getTransacciones():Observable<Transaccion> {
    return this.http.get(`${this.API_URI}/transactions`);
  }

  saveTransacciones(transaccion: Transaccion):Observable<Transaccion> {
    return this.http.post(`${this.API_URI}/transactions`, transaccion);
  }

  deleteTransacciones(id: string):Observable<Transaccion>{
  return this.http.delete(`${this.API_URI}/transactions/${id}`);
  }
}
