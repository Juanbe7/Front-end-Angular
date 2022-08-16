import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import {PortfolioService} from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  esconder:boolean=true;
  isLogged= false;
  isLoginFail = false;
  data$: Observable<boolean>;
  formLogin:FormGroup;
  constructor(public sharingService:PortfolioService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService, private tokenService: TokenService) {
    this.data$ = sharingService.sharingObservable;
    this.formLogin=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      deviceInfo:this.formBuilder.group({
        deviceId:'',
        deviceType:'',
        notificationToken:''
      })
    });
   }

  ngOnInit(): void {
    if(this.tokenService.getToken()!='null'&&this.tokenService.getToken()!='')
    {
      this.isLogged=true;
      this.isLoginFail=false;
      this.sharingService.sharingObservableData=true;
    }
  }
  salir()
  {
    this.tokenService.logOut();
    window.location.reload();
  }

  modoEdicion()
  {
    if(this.isLogged)
    {
      this.sharingService.sharingObservableData=true;
    }
    else
    {
      this.sharingService.sharingObservableData=false;
    }
  }

  get Email()
  {
    return this.formLogin.get('email');
  }

  get Pass()
  {
    return this.formLogin.get('password');
  }

  onEvent(event:Event)
  {
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.formLogin.value).subscribe(data=>
      {
        this.isLogged=true;
        this.isLoginFail=false;
        this.tokenService.setEmail(data.email);
        this.tokenService.setToken(data.accessToken);
        this.sharingService.sharingObservableData=true;
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        this.sharingService.sharingObservableData=false;
      });
  }

}
