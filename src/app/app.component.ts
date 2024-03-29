import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TicComponent } from './tic/tic.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,ReactiveFormsModule, 
           LoginComponent, TicComponent, CommonModule, MapComponent
          
          ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi-app';
  login:boolean=false;

  logged(e:any):void{
   if(e == 1){
       this.login=true;
   }

  }
  
}
