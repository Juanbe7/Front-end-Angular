import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import {PortfolioService} from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  esconder:boolean=true;
  data$: Observable<boolean>;
  formLogin:FormGroup;
  constructor(public sharingService:PortfolioService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService) {
    this.data$ = sharingService.sharingObservable;
    this.formLogin=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      contraseña:['',[Validators.required,Validators.minLength(8)]],
      deviceInfo:this.formBuilder.group({
        deviceId:'',
        deviceType:'',
        notificationToken:''
      })
    });
   }

  ngOnInit(): void {}

  modoEdicion()
  {
    this.data$.subscribe((datos: boolean)=>
    this.esconder=datos);

    if(this.esconder==true)
    {
      this.sharingService.sharingObservableData=false;
    }
    else
    {
      this.sharingService.sharingObservableData=true;
    }
  }

  get Email()
  {
    return this.formLogin.get('email');
  }

  get Pass()
  {
    return this.formLogin.get('contraseña');
  }

  onEvent(event:Event)
  {
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.formLogin.value).subscribe(data=>
      {
        console.log("data"+ JSON.stringify(data));
      })
  }

}
