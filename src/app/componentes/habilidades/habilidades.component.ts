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
  url:string;
  edicionHabilidad=
  {
    id:'',
    name: '',
    porcentaje:''
  };
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$ = datosPortfolio.sharingObservable
    this.url=datosPortfolio.apiURL;
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
      this.datosPortfolio.obtenerDatos(this.url+"/habilidad").subscribe(data =>
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
    this.datosPortfolio.modificarDatos(this.url+"/habilidad/"+this.edicionHabilidad.id,this.form.value).subscribe(resp=>{this.ngOnInit();this.form.reset();this.value=0;});
  }

  agregarHabilidad()
  {
    this.datosPortfolio.guardarDatos(this.url+"/habilidad",this.form2.value).subscribe(resp=>{this.ngOnInit();this.form2.reset();this.value=0;});
  }

  borrarHabilidad(id:number)
  {
    this.datosPortfolio.eliminarDatos(this.url+"/habilidad/"+id).subscribe(resp=>{this.ngOnInit();});
  }
}
