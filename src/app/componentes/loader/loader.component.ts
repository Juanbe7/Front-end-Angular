import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  
  isLoad$:Observable<boolean>;
  constructor(private datosPortfolio:PortfolioService) {
    this.isLoad$=this.datosPortfolio.isLoad;
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos(this.datosPortfolio.apiURL+"/perfil").subscribe(resp=>{
      this.datosPortfolio.isLoadData=true;
    });
  }

}
