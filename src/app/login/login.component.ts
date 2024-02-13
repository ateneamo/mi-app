import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user!:string ;
  pwd!:string ;
  valUser:number=0;
  valPwd: number=0;
  submited:number=0;

 

  loginForm  = new FormGroup({
    usuario: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.required
    ])
  });
  constructor() { }
  ngOnInit() {
  }
  verificaUsuario():void{
  
    this.submited=1;
    

   if (this.loginForm.controls.usuario.value!=null 
      && this.loginForm.controls.password.value!=null)
      {
       
        this.user=this.loginForm.controls.usuario.value;
        this.pwd=this.loginForm.controls.password.value;
      }
       
  

      /*debe conectarse a la bd y validar el ususario y contraseña*/ 

    if(this.loginForm.controls.usuario.value == "admin" 
    && this.loginForm.controls.password.value == "123")
    {
      alert("Bienvenido al sistema");
    }else{
      alert("Usuario o contraseña incorrectos");
    }

  }

}
