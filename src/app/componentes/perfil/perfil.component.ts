import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PerfilComponent implements OnInit {
  miPorfolio:any;
  ocultar=false;
  form:FormGroup;
  data$:Observable<boolean>;
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  { 
    this.data$=datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]]
    })
  }

  ngOnInit(): void 
  {
    this.datosPortfolio.obtenerDatos("http://localhost:8080/perfil").subscribe(data =>
      {
        this.miPorfolio=data;
      });
  }

  editarNombre()
  {
   this.ocultar=true;
  }

  btnAceptar()
  {
    this.datosPortfolio.guardarDatos("http://localhost:8080/perfil",this.form.value).subscribe();
    setTimeout(() =>{
      this.ngOnInit();
    },70);
    this.ocultar=false;
  }
  btnCancelar()
  {
    this.ocultar=false;
  }
}

