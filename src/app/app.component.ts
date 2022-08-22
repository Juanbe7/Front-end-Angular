import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioService } from './servicios/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoad$:Observable<boolean>;
  title = 'Portfolio-angular';

  constructor(private datosPortfolio:PortfolioService){
    this.isLoad$ = datosPortfolio.isLoad;
  }
}
