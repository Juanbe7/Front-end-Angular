import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.form=this.formBuilder.group({
      id:'',
      name:'',
      descripcion:"",
      link:'',
      linkImagen:'',
      fecha:'',
    })
    this.form2=this.formBuilder.group({
      id:'',
      name:'',
      descripcion:"",
      link:'',
      linkImagen:'',
      fecha:'',
    })
  }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos("http://localhost:3000/proyectos").subscribe(data =>
    {
      this.miPorfolioProyectos=data;
    });
  }
  agregarProyecto() 
  {
    this.datosPortfolio.guardarDatos("http://localhost:3000/proyectos",this.form.value).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },100); 
  }
  borrarProyecto(id:number)
  {
    console.log(id);
    this.datosPortfolio.eliminarDatos("http://localhost:3000/proyectos/"+id).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }
  irEditarProyecto(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionProyecto=this.miPorfolioProyectos[this._indice];
    console.log(indice);
    console.log(id);
    console.log(this.edicionProyecto);
  }
  editarProyecto()
  {
    this.edicionProyecto=this.form2.value;
    console.log(this.edicionProyecto);
    this.datosPortfolio.modificarDatos("http://localhost:3000/proyectos/"+this._id,this.form2.value).subscribe();
    setTimeout(() => 
    {
      this.ngOnInit();
    },50);
  }
}
