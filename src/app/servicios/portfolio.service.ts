import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpRequeset:HttpClient) { }
  obtenerDatos(url: string):Observable<any>
  {
    return this.httpRequeset.get(url);
  }

  guardarDatos(url: string,datos: any):Observable<any>{
    return this.httpRequeset.post(url,datos);
  }

  eliminarDatos(url:string):Observable<any>
  {
    return this.httpRequeset.delete(url);
  }
  modificarDatos(url:string,datos:any):Observable<any>
  {
    return this.httpRequeset.put(url,datos);
  }
}
