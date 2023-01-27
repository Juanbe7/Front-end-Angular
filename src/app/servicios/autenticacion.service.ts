import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  //url="https://juan-bustos-porfolio.herokuapp.com/login";
  constructor(private http:HttpClient, private datosPorfolio:PortfolioService) 
  { 

  }

  IniciarSesion(credenciales:any):Observable<any>
  {
    return this.http.post(this.datosPorfolio.apiURL+"/login", credenciales);  
  }
}

