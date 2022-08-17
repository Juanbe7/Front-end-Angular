import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="https://juan-bustos-porfolio.herokuapp.com/login";
  constructor(private http:HttpClient) 
  { 

  }

  IniciarSesion(credenciales:any):Observable<any>
  {
    return this.http.post(this.url, credenciales);  
  }
}

