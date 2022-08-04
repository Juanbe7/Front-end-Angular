import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {PortfolioService} from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  esconder:boolean=true;
  data$: Observable<boolean>;
  constructor(public sharingService:PortfolioService) {
    this.data$ = sharingService.sharingObservable;
   }

  ngOnInit(): void {
  }

  modoEdicion()
  {
    this.data$.subscribe((datos: boolean)=>
    this.esconder=datos);

    if(this.esconder==true)
    {
      this.sharingService.sharingObservableData=false;
    }
    else
    {
      this.sharingService.sharingObservableData=true;
    }
  }
}
