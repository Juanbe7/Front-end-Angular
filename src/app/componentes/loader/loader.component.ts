import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  
  isLoad=false;
  constructor(private datosPortfolio:PortfolioService) {

   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("https://juan-bustos-porfolio.herokuapp.com/perfil").subscribe(resp=>{
      this.isLoad=true;
    });
  }

}
