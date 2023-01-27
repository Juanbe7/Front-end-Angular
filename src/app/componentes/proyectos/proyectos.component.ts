import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  miPorfolioProyectos:any;
  form:FormGroup;
  form2:FormGroup;
  _id!: number;
  _indice!:number;
  data$:Observable<boolean>;
  edicionProyecto={
    id:'',
    name:'',
    descripcion:'',
    link:'',
    linkImagen:'',
    fecha:''
  };
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$=datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      descripcion:new FormControl('',Validators.compose([Validators.required])),
      link:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      fecha:new FormControl('',Validators.compose([Validators.required])),
    })
    this.form2=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      descripcion:new FormControl('',Validators.compose([Validators.required])),
      link:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      fecha:new FormControl('',Validators.compose([Validators.required])),
    })
  }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos(this.datosPortfolio.apiURL+"/proyecto").subscribe(data =>
    {
      this.miPorfolioProyectos=data;
    });
  }
  agregarProyecto() 
  {
    this.datosPortfolio.guardarDatos(this.datosPortfolio.apiURL+"/proyecto",this.form.value).subscribe(resp=>{this.ngOnInit();this.form.reset();});
  }
  borrarProyecto(id:number)
  {
    this.datosPortfolio.eliminarDatos(this.datosPortfolio.apiURL+"/proyecto/"+id).subscribe(resp=>{this.ngOnInit();});
  }
  irEditarProyecto(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionProyecto=this.miPorfolioProyectos[this._indice];
  }
  editarProyecto()
  {
    this.edicionProyecto=this.form2.value;
    this.datosPortfolio.modificarDatos(this.datosPortfolio.apiURL+"/proyecto/"+this._id,this.form2.value).subscribe(resp=>{this.ngOnInit();});
  }
}
