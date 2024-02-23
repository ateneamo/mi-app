import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup ,FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
     ReactiveFormsModule, 
     CommonModule, 
     RouterModule,
     NgxSpinnerModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  user!:string ;
  pwd!:string ;
  valUser:number=0;
  valPwd: number=0;
  submited:number=0;
  @Output() tic = new EventEmitter<any>();
 

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
  constructor (private router: Router,
              private spinner: NgxSpinnerService) { }
             
 

  ngOnInit() {
          
      }

  verificaUsuario():void{
  
   
    

   if (this.loginForm.controls.usuario.value!=null 
      && this.loginForm.controls.password.value!=null)
      {
        
        this.user=this.loginForm.controls.usuario.value;
        this.pwd=this.loginForm.controls.password.value;
        this.spinner.show();
      }
       
    
      
      /*debe conectarse a la bd y validar el ususario y contraseña*/ 

    if(this.loginForm.controls.usuario.value == "admin" 
    && this.loginForm.controls.password.value == "123")
    {
      this.submited=1;
     
    
    setTimeout(() => {
      this.spinner.hide();
    }, 150000);
    
      this.router.navigate(['/app-tic']);
      this.tic.emit(1) ;
    }
    else{
      alert("Usuario o contraseña incorrectos");
    }

  }

}
