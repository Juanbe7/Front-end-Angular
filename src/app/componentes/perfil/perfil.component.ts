import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { delay, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PerfilComponent implements OnInit {
  url:string = "https://juan-bustos-porfolio.herokuapp.com";
  miPorfolio:any;
  ocultar=false;
  form:FormGroup;
  form2:FormGroup;
  data$:Observable<boolean>;
  isLoad$:Observable<boolean>;
  edicionPerfil={
    nombre:'',
    descripcion:'',
    imagen:''
  } 
  public archivo:any;
  public previsualizacion: string | null ="";
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder,private sanitizer: DomSanitizer, private http:HttpClient )
  { 
    this.isLoad$=datosPortfolio.isLoad;
    this.data$=datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]]
    })
    this.form2=this.formBuilder.group({imagen: ['',Validators.required]})
  }
  
  ngOnInit(): void 
  {
    this.datosPortfolio.obtenerDatos(this.url+"/perfil").subscribe(data =>
      {
        this.miPorfolio=data;
        this.datosPortfolio.isLoadData=true;
        this.previsualizacion=this.miPorfolio.imagen;
      });
  }

  editarNombre()
  {
   this.ocultar=true;
  }

  btnAceptar()
  {
    this.datosPortfolio.guardarDatos(this.url+"/perfil",this.form.value).subscribe(resp=>{this.ngOnInit();this.form.reset();});
    this.ocultar=false;
  }
  btnCancelar()
  {
    this.ocultar=false;
  }

  capturarFile(event:any):any{
    this.previsualizacion=this.form2.value.imagen;
  }

  guardarImagen()
  {
    this.datosPortfolio.guardarDatos(this.url+"/perfil",this.form2.value).subscribe(resp=>{this.ngOnInit();})
  }

}

