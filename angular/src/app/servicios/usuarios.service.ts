import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3009';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${this.API_URI}/account`);
  }

  getUsuario(id: string):Observable<Usuario> {
    return this.http.get(`${this.API_URI}/account/${id}`);
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${this.API_URI}/account/${id}`);
  }

  saveUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post(`${this.API_URI}/account`, usuario);
  }

  updateUsuario(id: string|number, updatedUsuario: Usuario): Observable<Usuario> {
    return this.http.put(`${this.API_URI}/account/${id}`, updatedUsuario);
  }
}

