import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  public esconder:boolean =true;
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

  private sharingObservablePrivate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get sharingObservable()
  {
    return this.sharingObservablePrivate.asObservable();
  }

  set sharingObservableData(data: boolean)
  {
    this.sharingObservablePrivate.next(data);
  }

}

