import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPorfolioEducacion:any;
  edicionEducacion=
  {
    id:'',
    institucion:'',
    linkImagen:'',
    carrera:'',
    estado:'',
    tiempodesde:'',
    tiempohasta:''
  };
  form:FormGroup;
  form1:FormGroup;
  _id!: number;
  _indice!:number;
  data$:Observable<boolean>;
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$ = datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      id:'',
      institucion:'',
      linkImagen:"",
      carrera:'',
      estado:'',
      tiempodesde:'',
      tiempohasta:''
    })
    this.form1=this.formBuilder.group({
      id:'',
      institucion:'',
      linkImagen:"",
      carrera:'',
      estado:'',
      tiempodesde:'',
      tiempohasta:''
    })
   }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos("http://localhost:3000/educacion").subscribe(data =>
    {
      this.miPorfolioEducacion=data;
    });
  }
  agregarEducacion()
  {
    this.datosPortfolio.guardarDatos("http://localhost:3000/educacion",this.form.value).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },100);
   
  }
  borrarEducacion(id:number)
  {
    this.datosPortfolio.eliminarDatos("http://localhost:3000/educacion/"+id).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }
  irEditarEducacion(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionEducacion=this.miPorfolioEducacion[this._indice];
  }
  editarEducacion()
  {
    this.edicionEducacion=this.form.value;
    this.datosPortfolio.modificarDatos("http://localhost:3000/educacion/"+this._id,this.form.value).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }
}
