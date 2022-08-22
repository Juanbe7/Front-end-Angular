import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPorfolioEducacion:any;
  url:string = "https://juan-bustos-porfolio.herokuapp.com";
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
      id: '',
      institucion: new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      carrera:new FormControl('',Validators.compose([Validators.required])),
      estado:new FormControl('',Validators.compose([Validators.required])),
      tiempodesde:new FormControl('',Validators.compose([Validators.required])),
      tiempohasta:new FormControl('',Validators.compose([Validators.required])),
    })
    this.form1=this.formBuilder.group({
      id:'',
      institucion:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      carrera:new FormControl('',Validators.compose([Validators.required])),
      estado:new FormControl('',Validators.compose([Validators.required])),
      tiempodesde:new FormControl('',Validators.compose([Validators.required])),
      tiempohasta:new FormControl('',Validators.compose([Validators.required]))
    })
   }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos(this.url+"/educacion").subscribe(data =>
    {
      this.miPorfolioEducacion=data;
    });
  }
  agregarEducacion()
  {
    this.datosPortfolio.guardarDatos(this.url+"/educacion",this.form.value).subscribe(response=>{
      this.ngOnInit();
      this.form.reset();
    });
    
  }
  borrarEducacion(id:number)
  {
    this.datosPortfolio.eliminarDatos(this.url+"/educacion/"+id).subscribe(response=>{this.ngOnInit();});
  }
  irEditarEducacion(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionEducacion=this.miPorfolioEducacion[this._indice];
  }
  editarEducacion()
  {
    this.edicionEducacion=this.form1.value;
    this.datosPortfolio.modificarDatos(this.url+"/educacion/"+this._id,this.form1.value).subscribe(response=>{
      this.ngOnInit();
    });
    
  }
}
