import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  miPorfolioHabilidades:any;
  form:FormGroup;
  form2:FormGroup;
  _id:number=0;
  _indice:number=0;
  value:number|null=0;
  data$:Observable<boolean>;
  edicionHabilidad=
  {
    id:'',
    name: '',
    porcentaje:''
  };
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$ = datosPortfolio.sharingObservable
    this.form=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      porcentaje:""
    })
    this.form2=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      porcentaje:""
    })
  }

  ngOnInit(): void 
  {
      this.datosPortfolio.obtenerDatos("http://localhost:8080/habilidad").subscribe(data =>
      {
        this.miPorfolioHabilidades=data;
      });
  }

  irEditarHabilidad(indice:number,id:number)
  {
    
    this._indice=indice;
    this._id=id;
    this.edicionHabilidad=this.miPorfolioHabilidades[this._indice];
    this.value=parseInt(this.edicionHabilidad.porcentaje);
  }

  editarHabilidad()
  {
    this.datosPortfolio.modificarDatos("http://localhost:8080/habilidad/"+this.edicionHabilidad.id,this.form.value).subscribe();
      setTimeout(() => 
      {
        this.ngOnInit();
      },50);
  }

  agregarHabilidad()
  {
    this.datosPortfolio.guardarDatos("http://localhost:8080/habilidad",this.form2.value).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }

  borrarHabilidad(id:number)
  {
    this.datosPortfolio.eliminarDatos("http://localhost:8080/habilidad/"+id).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }
}
