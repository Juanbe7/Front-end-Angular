import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  currentUserSubject: BehaviorSubject<any>;
  url="dasdsada";
  constructor(private http:HttpClient) 
  { 
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
  }

  IniciarSesion(credenciales:any):Observable<any>
  {
  return this.http.post(this.url,credenciales).pipe(map(data=>{
    sessionStorage.setItem('currentUser',JSON.stringify(data));
  }))
  }
}

